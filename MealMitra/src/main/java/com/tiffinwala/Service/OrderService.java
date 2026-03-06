package com.tiffinwala.Service;

import com.tiffinwala.Dto.CreateOrderDTO;
import com.tiffinwala.Dto.OrderItemRequestDTO;
import com.tiffinwala.Entity.*;
import com.tiffinwala.Repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final OrderItemRepository orderItemRepo;
    private final MenuRepository menuRepo;
    private final CustomerRepository customerRepo;
    private final HomemakerRepository homemakerRepo;
    private final DeliveryBoyRepository deliveryBoyRepo;

    public OrderService(OrderRepository orderRepo,
                        OrderItemRepository orderItemRepo,
                        MenuRepository menuRepo,
                        CustomerRepository customerRepo,
                        HomemakerRepository homemakerRepo,
                        DeliveryBoyRepository deliveryBoyRepo) {

        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.menuRepo = menuRepo;
        this.customerRepo = customerRepo;
        this.homemakerRepo = homemakerRepo;
        this.deliveryBoyRepo = deliveryBoyRepo;
    }

    // ================= CREATE ORDER =================
    @Transactional
    public Order createOrderByEmail(String email, CreateOrderDTO dto) {

        Customer customer = customerRepo.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return createOrder(customer.getId(), dto);
    }

    @Transactional
    public Order createOrder(Long customerId, CreateOrderDTO dto) {

        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        if (dto.getItems() == null || dto.getItems().isEmpty()) {
            throw new RuntimeException("Order must contain items");
        }

        Menu firstMenu = menuRepo.findById(dto.getItems().get(0).getMenuId())
                .orElseThrow(() -> new RuntimeException("Menu not found"));

        Homemaker homemaker = firstMenu.getHomemaker();

        Order order = new Order();
        order.setCustomer(customer);
        order.setHomemaker(homemaker);
        order.setStatus("PENDING_PAYMENT");
        order.setAmount(0.0);

        order = orderRepo.save(order);

        double foodTotal = 0.0;

        for (OrderItemRequestDTO itemDto : dto.getItems()) {

            Menu menu = menuRepo.findById(itemDto.getMenuId())
                    .orElseThrow(() -> new RuntimeException("Menu not found"));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setMenu(menu);
            item.setQuantity(itemDto.getQuantity());

            double price = menu.getPrice() * itemDto.getQuantity();
            item.setPrice(price);

            foodTotal += price;
            orderItemRepo.save(item);
        }

        // final amount = food + 25%
        double extraCharge = foodTotal * 0.25;
        double finalAmount = foodTotal + extraCharge;

        order.setAmount(finalAmount);
        return orderRepo.save(order);
    }

    // ================= DISTRIBUTE MONEY =================
    @Transactional
    public void distributeMoney(Order order){

        double totalPaid = order.getAmount();

        double foodPrice = totalPaid / 1.25;
        double extra = totalPaid - foodPrice;

        double homemakerShare = foodPrice;
        double deliveryShare = extra * 0.60;
        double adminShare = extra * 0.40;

        // homemaker wallet
        Homemaker h = order.getHomemaker();
        if(h.getWalletBalance() == null) h.setWalletBalance(0.0);
        h.setWalletBalance(h.getWalletBalance() + homemakerShare);
        homemakerRepo.save(h);

        // delivery wallet
        DeliveryBoy d = order.getDeliveryBoy();
        if(d != null){
            if(d.getWalletBalance() == null) d.setWalletBalance(0.0);
            d.setWalletBalance(d.getWalletBalance() + deliveryShare);
            deliveryBoyRepo.save(d);
        }

        System.out.println("💰 Homemaker gets: ₹" + homemakerShare);
        System.out.println("🚚 Delivery gets: ₹" + deliveryShare);
        System.out.println("🏢 Admin gets: ₹" + adminShare);
    }

    // ================= CUSTOMER ORDERS =================
    public List<Order> getCustomerOrdersByEmail(String email) {

        Customer customer = customerRepo.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return orderRepo.findByCustomerId(customer.getId());
    }

    // ================= HOMEMAKER ACCEPT + AUTO DELIVERY ASSIGN =================
    @Transactional
    public void acceptOrder(Long orderId, Long homemakerId) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!"PAID".equals(order.getStatus())) {
            throw new RuntimeException("Order must be PAID to accept");
        }

        // 🔥 find available delivery boy
        DeliveryBoy boy = deliveryBoyRepo.findFirstByAvailableTrue()
                .orElseThrow(() -> new RuntimeException("No delivery boy available"));

        // assign delivery boy
        order.setDeliveryBoy(boy);
        order.setStatus("ASSIGNED");

        boy.setAvailable(false);

        deliveryBoyRepo.save(boy);
        orderRepo.save(order);
    }

    // ================= HOMEMAKER REJECT =================
    @Transactional
    public void rejectOrder(Long orderId, Long homemakerId) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus("REJECTED");
        orderRepo.save(order);
    }

    // ================= DELIVERY ACCEPT =================
    @Transactional
    public void deliveryAccept(Long orderId, Long deliveryBoyId) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!"ASSIGNED".equals(order.getStatus())) {
            throw new RuntimeException("Order not assigned yet");
        }

        order.setStatus("OUT_FOR_DELIVERY");
        orderRepo.save(order);
    }

    // ================= DELIVERY COMPLETE =================
    @Transactional
    public void markDelivered(Long orderId, Long deliveryBoyId) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus("DELIVERED");

        DeliveryBoy boy = order.getDeliveryBoy();
        if(boy != null){
            boy.setAvailable(true);
            deliveryBoyRepo.save(boy);
        }

        orderRepo.save(order);

        // distribute money after delivery
        distributeMoney(order);
    }

    // ================= DELIVERY ORDERS =================
    public List<Order> getDeliveryOrders(Long deliveryBoyId) {
        return orderRepo.findByDeliveryBoyId(deliveryBoyId);
    }
}

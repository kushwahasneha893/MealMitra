package com.tiffinwala.Service;

import com.tiffinwala.Entity.Homemaker;
import com.tiffinwala.Entity.Menu;
import com.tiffinwala.Entity.User;
import com.tiffinwala.Repository.HomemakerRepository;
import com.tiffinwala.Repository.MenuRepository;
import com.tiffinwala.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MenuService {

    private final MenuRepository menuRepo;
    private final HomemakerRepository homemakerRepo;
    private final UserRepository userRepo;

    public MenuService(MenuRepository menuRepo,
                       HomemakerRepository homemakerRepo,
                       UserRepository userRepo) {
        this.menuRepo = menuRepo;
        this.homemakerRepo = homemakerRepo;
        this.userRepo = userRepo;
    }

    // ---------------- HELPER ----------------
    private Homemaker getHomemakerFromEmail(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return homemakerRepo.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Homemaker not found"));
    }

    // ---------------- ADD MENU ----------------
    public Menu addMenu(String email, Menu menu) {
        Homemaker homemaker = getHomemakerFromEmail(email);
        menu.setHomemaker(homemaker);
        return menuRepo.save(menu);
    }

    // ---------------- GET MY MENU ----------------
    public List<Menu> getMenuByHomemaker(String email) {
        Homemaker homemaker = getHomemakerFromEmail(email);
        return menuRepo.findByHomemakerId(homemaker.getId());
    }

    // ---------------- UPDATE MENU ----------------
    public Menu updateMenu(Long id, String email, Menu updatedMenu) {
        Homemaker homemaker = getHomemakerFromEmail(email);

        Menu menu = menuRepo
                .findByIdAndHomemakerId(id, homemaker.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Menu not found or not owned by you")
                );

        menu.setFoodName(updatedMenu.getFoodName());
        menu.setCategory(updatedMenu.getCategory());
        menu.setPrice(updatedMenu.getPrice());
        menu.setQuantity(updatedMenu.getQuantity());

        return menuRepo.save(menu);
    }

    // ---------------- DELETE MENU ----------------
    public void deleteMenu(Long id, String email) {
        Homemaker homemaker = getHomemakerFromEmail(email);

        Menu menu = menuRepo
                .findByIdAndHomemakerId(id, homemaker.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Menu not found or not owned by you")
                );

        menuRepo.delete(menu);
    }

    // ---------------- CUSTOMER VIEW ----------------
    public List<Menu> showValidMenu() {
        LocalDateTime twelveHoursAgo = LocalDateTime.now().minusHours(12);
        return menuRepo.findByCreatedAtAfter(twelveHoursAgo);
    }

    // ---------------- GET BY ID ----------------
    public Menu getMenuById(Long id) {
        return menuRepo.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Menu not found with ID: " + id)
                );
    }
}

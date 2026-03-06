package com.tiffinwala.Controller;

import com.tiffinwala.Entity.Menu;
import com.tiffinwala.Service.MenuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/homemaker")
@CrossOrigin(origins = "http://localhost:5173")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    // ---------------- ADD MENU ----------------
    @PostMapping("/menu")
    public ResponseEntity<?> addMenu(@RequestBody Menu menu,
                                     Authentication auth) {

        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized");
        }

        String email = auth.getName();
        Menu saved = menuService.addMenu(email, menu);
        return ResponseEntity.ok(saved);
    }

    // ---------------- GET MY MENU ----------------
    @GetMapping("/menu")
    public ResponseEntity<?> myMenu(Authentication auth) {

        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized");
        }

        String email = auth.getName();
        return ResponseEntity.ok(menuService.getMenuByHomemaker(email));
    }

    // ---------------- UPDATE MENU ----------------
    @PutMapping("/menu/{id}")
    public ResponseEntity<?> updateMenu(@PathVariable Long id,
                                        @RequestBody Menu menu,
                                        Authentication auth) {

        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized");
        }

        String email = auth.getName();
        Menu updated = menuService.updateMenu(id, email, menu);
        return ResponseEntity.ok(updated);
    }

    // ---------------- DELETE MENU ----------------
    @DeleteMapping("/menu/{id}")
    public ResponseEntity<?> deleteMenu(@PathVariable Long id,
                                        Authentication auth) {

        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized");
        }

        String email = auth.getName();
        menuService.deleteMenu(id, email);
        return ResponseEntity.ok("Menu deleted successfully");
    }

    // ---------------- SHOW ALL MENUS (CUSTOMER) ----------------
    @GetMapping("/public/menu")
    public ResponseEntity<List<Menu>> allMenus() {
        return ResponseEntity.ok(menuService.showValidMenu());
    }
}

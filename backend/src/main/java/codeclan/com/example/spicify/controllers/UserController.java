package codeclan.com.example.spicify.controllers;

import codeclan.com.example.spicify.models.User;
import codeclan.com.example.spicify.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;



//    @RequestMapping(value ="/", produces = "application/json")
//    public static void makeUrl(HttpServletRequest request)
//    {
//        String test = request.getRequestURL().toString() + "?" + request.getQueryString();
//        System.out.println("AHHHHHHHHH: " + test);
//    }

}

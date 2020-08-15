package codeclan.com.example.spicify.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class ApiController {


    @RequestMapping(value ="/", produces = "application/json")
    public static void makeUrl(HttpServletRequest request)
    {
        String test = request.getRequestURL().toString() + "?" + request.getQueryString();
        System.out.println("AHHHHHHHHH: " + test);
    }

}

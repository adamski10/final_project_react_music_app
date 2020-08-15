package codeclan.com.example.spicify.repositories;

import codeclan.com.example.spicify.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

}

package codeclan.com.example.spicify;

import codeclan.com.example.spicify.models.User;
import codeclan.com.example.spicify.repositories.UserRepository;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.SpotifyHttpManager;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.text.ParseException;
import java.util.Optional;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

@SpringBootApplication
public class SpicifyApplication {

//	@Autowired
//	private static UserRepository userRepository;
	private static final String clientId = "e4a55fa02520413487ad8a7abec7bce3";
	private static final String clientSecret = "f84d9789927240d8b2e3a24f92809306";
	private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:8080/");
	private static String code = "";

	private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
			.setClientId(clientId)
			.setClientSecret(clientSecret)
			.setRedirectUri(redirectUri)
			.build();
	private static final AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
//          .state("x4xkmn9pu3j6ukrs8n")
          .scope("user-read-private,user-read-email")
//          .show_dialog(true)
          .build();

	public static void authorizationCodeUri_Sync() {
		final URI uri = authorizationCodeUriRequest.execute();

		System.out.println("URI: " + uri.toString());
	}

//	public static void assignUserCode() {
//		Optional<User> user = userRepository.findById(1L);
//		String userAuthCode = user.get().getUserCode();
//		code = userAuthCode;
//		System.out.println(userAuthCode);
//	}

//	public static void authorizationCode_Sync() {
//		try {
//			assignUserCode();
//
//			final AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code).build();
//
//			final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
//
//			// Set access and refresh token for further "spotifyApi" object usage
//			spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
//			spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
//
//			System.out.println("Expires in: " + authorizationCodeCredentials.getExpiresIn());
//		} catch (IOException | SpotifyWebApiException | org.apache.hc.core5.http.ParseException e) {
//			System.out.println("Error: " + e.getMessage());
//		}
//	}


	public static void authorizationCodeUri_Async() {
		try {
			final CompletableFuture<URI> uriFuture = authorizationCodeUriRequest.executeAsync();

			// Thread free to do other tasks...

			// Example Only. Never block in production code.
			final URI uri = uriFuture.join();

			System.out.println("URI: " + uri.toString());
		} catch (CompletionException e) {
			System.out.println("Error: " + e.getCause().getMessage());
		} catch (CancellationException e) {
			System.out.println("Async operation cancelled.");
		}
	}


	public static void main(String[] args) {
		SpringApplication.run(SpicifyApplication.class, args);
		authorizationCodeUri_Sync();
		authorizationCodeUri_Async();
//		authorizationCode_Sync();
	}

}

import java.net.*;
import java.io.*;

public class EchoClient {
    public static void main(String[] args) {
        String str;
        try (Socket socket = new Socket(InetAddress.getLocalHost(), 9000);
             BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));
             BufferedReader serverInput = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true)) {

            System.out.println("Client started. Type messages to send to the server.");

            while (true) {
                System.out.print("Client: ");
                str = userInput.readLine();
                if (str == null || str.equalsIgnoreCase("exit")) {
                    break;
                }
                out.println(str);
                String response = serverInput.readLine();
                if (response != null) {
                    System.out.println("Server: " + response);
                } else {
                    System.out.println("Server has closed the connection.");
                    break;
                }
            }
        } catch (IOException e) {
            System.out.println("Client error: " + e.getMessage());
        }
    }
}

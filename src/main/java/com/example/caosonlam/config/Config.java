package com.example.caosonlam.config;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Collections;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
// import javax.swing.text.html.HTMLDocument.Iterator;

// import io.jsonwebtoken.lang.Collections;

public class Config {
    public static String vnp_PayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public static String vnp_ReturnUrl = "http://localhost:8080/vnpay_jsp/vnpay_return.jsp";
    public static String vnp_TmnCode = "PWGO9FQQ";
    public static String vnp_Version = "2.1.0";
    public static String vnp_Command = "pay";
    public static String secretKey = "UFORDJHTQYSA6AZX9YFD6JUNA9A6MVV2";
    public static String vnp_ApiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";

    // public static String md5(String message) {
    // String digest = null;
    // try {
    // MessageDigest md = MessageDigest.getInstance("MD5");
    // byte[] hash = md.digest(message.getBytes("UTF-8"));
    // StringBuilder sb = new StringBuilder(2 * hash.length);
    // for (byte b : hash) {
    // sb.append(String.format("%02x", b & 0xff));
    // }
    // digest = sb.toString();
    // } catch (UnsupportedEncodingException ex) {
    // digest = "";
    // } catch (NoSuchAlgorithmException ex) {
    // digest = "";
    // }
    // return digest;
    // }

    public static String Sha256(String message) {
        String digest = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(message.getBytes("UTF-8"));
            StringBuilder sb = new StringBuilder(2 * hash.length);
            for (byte b : hash) {
                sb.append(String.format("%02x", b & 0xff));
            }
            digest = sb.toString();
        } catch (UnsupportedEncodingException ex) {
            digest = "";
        } catch (NoSuchAlgorithmException ex) {
            digest = "";
        }
        return digest;
    }

    // Hàm tạo chuỗi ký tự hash từ các field theo định dạng chuẩn VNPAY
    public static String hashAllFields(Map<String, String> fields) {
        List<String> fieldNames = new ArrayList<>(fields.keySet());
        Collections.sort(fieldNames); // Sắp xếp tên các trường theo thứ tự từ điển
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < fieldNames.size(); i++) {
            String fieldName = fieldNames.get(i);
            String fieldValue = fields.get(fieldName);
            if (fieldValue != null && fieldValue.length() > 0) {
                sb.append(fieldName).append("=").append(fieldValue);
            }
            if (i < fieldNames.size() - 1) {
                sb.append("&");
            }
        }

        return hmacSHA512(secretKey, sb.toString()); // Trả về chuỗi mã hóa HmacSHA512
    }

    public static String hmacSHA512(final String key, final String data) {
        try {

            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }

    public static String getRandomNumber(int len) {
        Random rnd = new Random();
        String chars = "0123456789";
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }

    public static String getIpAddress(jakarta.servlet.http.HttpServletRequest req) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getIpAddress'");
    }

}

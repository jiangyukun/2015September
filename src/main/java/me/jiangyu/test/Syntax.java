package me.jiangyu.test;

import java.io.IOException;

/**
 * jiangyukun on 2015/9/24.
 */
public class Syntax {
    private enum Suit {CLUBS, HEARTS, SPADES, DIAMONDS}
    private String a = "";

    public static void main(String[] args) {
        try {
            throw new IOException(new IOException("xx"));
        } catch (IllegalArgumentException | IOException e) {
            System.out.println(e);
        }
    }
}

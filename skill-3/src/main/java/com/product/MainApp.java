package com.product;

import org.hibernate.*;

public class MainApp {

    public static void main(String[] args) {

        Session s=HibernateUtil.getFactory().openSession();
        Transaction t=s.beginTransaction();

        s.save(new Product("Laptop","Gaming",65000,5));
        s.save(new Product("Keyboard","Mechanical",3000,15));
        s.save(new Product("Mouse","Wireless",800,25));
        s.save(new Product("Monitor","Electronics",12000,8));
        s.save(new Product("Phone","Electronics",25000,12));
        s.save(new Product("Headset","Accessories",2000,20));
        s.save(new Product("Printer","Office",15000,0));

        t.commit();
        s.close();

        System.out.println("Data inserted successfully");
    }
}

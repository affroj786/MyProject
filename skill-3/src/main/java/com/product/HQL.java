package com.product;

import org.hibernate.*;
import java.util.*;

public class HQL{

    public static void main(String[] args) {

        Session s=HibernateUtil.getFactory().openSession();

        System.out.println("\nPrice Ascending");
        s.createQuery("from Product order by price asc",Product.class)
         .list().forEach(p->System.out.println(p.getName()+" "+p.getPrice()));

        System.out.println("\nPrice Descending");
        s.createQuery("from Product order by price desc",Product.class)
         .list().forEach(p->System.out.println(p.getName()+" "+p.getPrice()));

        System.out.println("\nQuantity High First");
        s.createQuery("from Product order by quantity desc",Product.class)
         .list().forEach(p->System.out.println(p.getName()+" "+p.getQuantity()));

        Query q1=s.createQuery("from Product");
        q1.setFirstResult(0);
        q1.setMaxResults(3);
        System.out.println("\nFirst 3 Products");
        q1.list().forEach(p->System.out.println(((Product)p).getName()));

        Query q2=s.createQuery("from Product");
        q2.setFirstResult(3);
        q2.setMaxResults(3);
        System.out.println("\nNext 3 Products");
        q2.list().forEach(p->System.out.println(((Product)p).getName()));

        Long total=(Long)s.createQuery("select count(*) from Product").uniqueResult();
        System.out.println("\nTotal Products: "+total);

        Long available=(Long)s.createQuery(
            "select count(*) from Product where quantity>0").uniqueResult();
        System.out.println("Available Products: "+available);

        System.out.println("\nCount by Description");
        List<Object[]> grp=s.createQuery(
            "select description,count(*) from Product group by description").list();
        for(Object[] o:grp)
            System.out.println(o[0]+" : "+o[1]);

        Object[] mm=(Object[])s.createQuery(
            "select min(price),max(price) from Product").uniqueResult();
        System.out.println("\nMin Price: "+mm[0]+" Max Price: "+mm[1]);

        System.out.println("\nPrice Between 5000 and 30000");
        s.createQuery("from Product where price between 5000 and 30000",Product.class)
         .list().forEach(p->System.out.println(p.getName()+" "+p.getPrice()));

        System.out.println("\nName starts with P");
        s.createQuery("from Product where name like 'P%'",Product.class)
         .list().forEach(p->System.out.println(p.getName()));

        System.out.println("\nName ends with r");
        s.createQuery("from Product where name like '%r'",Product.class)
         .list().forEach(p->System.out.println(p.getName()));

        System.out.println("\nName contains 'one'");
        s.createQuery("from Product where name like '%one%'",Product.class)
         .list().forEach(p->System.out.println(p.getName()));

        System.out.println("\nName length = 6");
        s.createQuery("from Product where length(name)=6",Product.class)
         .list().forEach(p->System.out.println(p.getName()));

        s.close();
    }
}

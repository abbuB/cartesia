package helper;

/*

  factorial
  primorial
  primorian
  seive
  divisor
  factor
  eratosthenes
  composite
  highly composite
  
 */
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class Primes {
  
  
  /* Strings =============================================================== */
  
  static String semicolon = ";";
  static String comma = ",";
  static String pipe = "|";
  
  
  /* Primes ================================================================ */
  
  /*  eratosthenes - return an array of primes below n ------------------------------*/
  var eratosthenes=function(n) {

    var sieve=[];
    
    sieve[0] = 0;
    sieve[1] = 0;
    sieve[2] = 1;
    
    for (int i=3; i<n; i+=2) {

      if (sieve[i] == 0) {
        
        for (var j=2*i; j<n; j+=i) {
          sieve[j] = 1;
        }

      }

    }

    return sieve;

  }

  /*  isPrime - return true if n is prime ------------------------------*/
  function isPrime(n) {

    if      ( n===1     ) { return false; }   //  1 (one) is not prime
    else if ( n<4       ) { return true;  }   //  2 and 3 are prime
    else if ( n%2 === 0 ) { return false; }   //  even numbers
    else if ( n<9       ) { return true;  }   //  we have already excluded 4, 6 and 8
    else if ( n%3 === 0 ) { return false; }
    else {
      
      var r = sqrt(n);           //  n rounded to the greatest long r so that r*r<=n
      var l = 5;
      
      while (l<=r) {
      
        if (n % l === 0      ) {return false; }
        if (n % (l+2) === 0  ) {return false; }
        
        l+=6;                                 //  All primes greater than 3 can be written in the form 6k +/- 1
      
      }
      
      return true;  // n is prime

      
    }

  };
  // public static boolean isPrime(double n) {

    // if      ( n==1      ) { return false; }   //  1 (one) is not prime
    // else if ( n<4       ) { return true;  }   //  2 and 3 are prime
    // else if ( n%2 == 0  ) { return false; }   //  even numbers
    // else if ( n<9       ) { return true;  }   //  we have already excluded 4, 6 and 8
    // else if ( n%3 == 0  ) { return false; }
    // else {
      
      // long r = (long)Maths.sqrt(n);           //  n rounded to the greatest long r so that r*r<=n
      // long l = 5;
      
      // while (l<=r) {
      
        // if (n % l == 0      ) {return false; }
        // if (n % (l+2) == 0  ) {return false; }
        
        // l+=6;                                 //  All primes greater than 3 can be written in the form 6k +/- 1
      
      // }
      
      // return true;  // n is prime

      
    // }

  // }
  
  // /*  nextPrime - return the next prime > n ----------------------------*/
  // public static int  nextPrime(int n) {
    
    // while (isPrime(n+=1)==false) {}
    
    // return n;
    
  // }
  // public static long nextPrime(long n) {
    
    // while (isPrime(n+=1)==false) {}
    
    // return n;
    
  // }
  // public static double nextPrime(double n) {
    
    // while (isPrime(n+=1)==false) {}
    
    // return n;
    
  // }
  
  // /*  previousPrime - return the next prime < n ------------------------*/
  // public static int  previousPrime(int n) {
    
    // while (isPrime(n-=1)==false) {}
    
    // return n;
    
  // }
  // public static long previousPrime(long n) {
    
    // while (isPrime(n-=1)==false) {}
    
    // return n;
    
  // }
  
  
  /* Factors =============================================================== */
  
  /* primeFactors
     returns a list of prime factors of n ------------------------------*/
  public static ArrayList<Integer> primeFactors(int n) {

    ArrayList<Integer> factors = new ArrayList<Integer>();
    
//    System.out.println(n);
    
    while (n%2==0) {
      factors.add(2);
      n=n>>1;      
    }
    
    for (int f=3; f<=n; f+=2) {
      
      while (n % f == 0) {
        factors.add(f);
        n/=f;
      }
      
    }
    
    return factors;
    
  }
  public static ArrayList<Long> primeFactors(long n) {

    ArrayList<Long> factors = new ArrayList<Long>();
    
    while (n%2l==0) {
      factors.add(2l);
      n=n>>1;
    }
    
    for (long f=3; f<=n; f+=2) {
      
      while (n % f == 0) {
        factors.add(f);
        n /= f;
      }
      
    }
    
    return factors;
    
  }
  public static ArrayList<Double> primeFactors(Double n) {

    ArrayList<Double> factors = new ArrayList<Double>();
    
    while (n%2d==0) {
      factors.add(2d);
      n/=2;
    }
    
    for (Double f=3d; f<=n; f+=2) {
      
      while (n % f == 0) {
        factors.add(f);
        n /= f;
      }
      
    }
    
    return factors;
    
  }
  
  /* distinctPrimeFactors
     returns a set of prime factors of n -------------------------------*/
  public static Set<Integer> distinctPrimeFactors(int n) {

    ArrayList<Integer> factors = primeFactors(n);
    
    Set<Integer> distinctFactors = new HashSet<Integer>();
 
    for (int f : factors) {
      distinctFactors.add(f);
    }
    
    return distinctFactors;
    
  }
  public static Set<Long> distinctPrimeFactors(Long n) {

    ArrayList<Long> factors = primeFactors(n);
    
    Set<Long> distinctFactors = new HashSet<Long>();
    
    for (long f : factors) {
      distinctFactors.add(f);
    }
    
    return distinctFactors;
    
  }
  
  /* productOfDistinctPrimeFactors
     returns the product of distinct prime factors of n ----------------*/
  public static int productOfDistinctPrimeFactors(int n) {

    long[] N = primeFactorArray((long)n);
    int product=1;
    
    for (int i=2; i<N.length; i+=2) {
      
      if (N[i]>0) {
        product*=N[i];
      }
      
    }

    return product;

  }
  public static long productOfDistinctPrimeFactors(Long n) {

    long[] N = primeFactorArray(n);
    long product=1;
    
    for (int i=2; i<N.length; i+=2) {
      
      if (N[i]>0) {
        product*=N[i];
      }
      
    }

    return product;

  }

  /* primeFactorString
     returns a delimited string of prime factors of n ------------------*/
  public static String primeFactorString(int n) {

    String FACTORS = "";

    ArrayList<Integer> factors = primeFactors(n);
    
    for (int f : factors) {

        FACTORS = FACTORS.concat(f + comma);
    
    }

    return FACTORS;
  
  }
  public static String primeFactorString(long n) {

    String FACTORS = "";

    ArrayList<Long> factors = Primes.primeFactors(n);
    
    for (long f : factors) {

        FACTORS = FACTORS.concat(f + comma);
    
    }

    return FACTORS;
  
  }
  public static String primeFactorString(Double n) {

    String FACTORS = "";

    ArrayList<Double> factors = Primes.primeFactors(n);
    
    for (Double f : factors) {

        FACTORS = FACTORS.concat(f + comma);
    
    }

    return FACTORS;
  
  }
  
  /* primeFactorArray
     returns a list of prime factors of n ------------------------------*/
  public static int[] primeFactorArray(int n) {

    int[] factors=new int[4];
    
    factors[0]=n;
    
    /*  Factors           0 -> product of unique prime factors (p)
                          1 -> number (n) 
        |0|1|2|3|4|5|...  2 -> 1st prime factor base (b)
        |p|n|b|e|b|e|...  3 -> 1st prime factor exponent (e)
                          4 -> 2nd prime factor base (b)
                          5 -> 2nd prime factor exponent (e)
                          ...
    */
    int cursor=2;
    
    while (n%2 == 0) {
      
      factors[cursor]=2;
      factors[3]++;
      n/=2;
      
    }
    
    if (factors[cursor]>0) {
      cursor+=2;
    }
    
    int[] FACTORS;
    int e=0;
    
    for (int f=3; f<=n; f+=2) {
      
      while (n % f == 0) {

        e++;
        n /= f;
        
      }

      if (e!=0) {
        
        if(factors[factors.length-1]>0) {
          
          FACTORS= new int[factors.length+2];
          
          System.arraycopy(factors, 0, FACTORS, 0, factors.length);
          factors=new int[FACTORS.length];
          System.arraycopy(FACTORS, 0, factors, 0, FACTORS.length);
          
        }
        
        factors[cursor]=f;
        factors[cursor+1]=e;
        
        cursor+=2;

      }
      
      e=0;
      
    }
 
    factors[1]=productOfPrimeFactors(factors);
    
    return factors;
    
  }  
  public static double[] primeFactorArray(double n) {

    double[] factors=new double[4];
    
    factors[0]=n;
    
    /*  Factors           0 -> product of unique prime factors (p)
                          1 -> number (n) 
        |0|1|2|3|4|5|...  2 -> 1st prime factor base (b)
        |p|n|b|e|b|e|...  3 -> 1st prime factor exponent (e)
                          4 -> 2nd prime factor base (b)
                          5 -> 2nd prime factor exponent (e)
                          ...
    */
    int cursor=2;
    
    while (n%2 == 0) {
      
      factors[cursor]=2;
      factors[3]++;
      n/=2;
      
    }
    
    if (factors[cursor]>0) {
      cursor+=2;
    }
    
    double[] FACTORS;
    int e=0;
    
    for (int f=3; f<=n; f+=2) {
      
      while (n % f == 0) {

        e++;
        n /= f;
        
      }

      if (e!=0) {
        
        if(factors[factors.length-1]>0) {
          
          FACTORS= new double[factors.length+2];
          
          System.arraycopy(factors, 0, FACTORS, 0, factors.length);
          factors=new double[FACTORS.length];
          System.arraycopy(FACTORS, 0, factors, 0, FACTORS.length);
          
        }
        
        factors[cursor]=f;
        factors[cursor+1]=e;
        
        cursor+=2;

      }
      
      e=0;
      
    }
 
//    factors[1]=productOfPrimeFactors(factors);
    
    return factors;
    
  }
  
//  public static int factorCount(int n) {
//  
//    int[] pf=primeFactorArray(n);
//    
//    int factors=1;
//    
//    for(int f=3; f<pf.length; f+=2) {
//      factors*=pf[f]+1;
//    }
//    
//    return factors;
//    
//  }
  
//  public static long factorCount(long n) {
//    
//    long[] pf=primeFactorArray(n);
//    
//    long factors=1;
//    
//    for(int f=3; f<pf.length; f+=2) {
//      factors*=pf[f]+1;
//    }
//    
//    return factors;
//    
//  }

  public static double factorCount(double n) {
    
    double[] pf=primeFactorArray(n);
    
    long factors=1;
    
    for(int f=3; f<pf.length; f+=2) {
      factors*=pf[f]+1;
    }
    
    return factors;
    
  }
  
  /* primoriansBelow
     returns an ArrayList of all primorians below n --------------------*/

  public static Long[] primoriansBelow(long n) {

    /*

      2, 6, 12, 30, 60, 180, 210, 360, 420, 1260, 2310, 2520, 4620, 6300, 12600
      
      1, 2, 6, 30, 210, 2310, 30030, 510510
      
    */
    
    ArrayList<Long> primorians = primorialsBelow(n);
    ArrayList<Long> temp = new ArrayList<Long>();
    
    System.out.println(primorians);
    
    Long value=0l;
    
    for(int p=primorians.size()-1; p>=0; p--) {
      
      for(int t=0; t<p; t++) {
        
        value=primorians.get(p)*primorians.get(t);
        
        if(value<n) {          
          
          if(primorians.contains(value)==false &&
             temp.contains(value)==false) {
            
            System.out.println(p + " : " + t + " -- " + value);
            
            temp.add(value);
            
          }
          
        }
        
      }
      
    }
    
    primorians.addAll(temp);
    
    Collections.sort(primorians);
    
    System.out.println(primorians);
    
//    return primorians;
    
    return primorians.toArray(new Long[primorians.size()]);

  }
  
  
  /* primorialsBelow
     returns an ArrayList of all primorials below n --------------------*/
  public static Integer[] primorialsBelow(int n) {
    
    ArrayList<Integer> pList = new ArrayList<Integer>();

    int primorial=1;
    int prime=1;

    for(int p=1; primorial<n; p++) {
      
      prime=nextPrime(prime);
      primorial*=prime;
      
      if(primorial<n) {
        pList.add(primorial);
      }
      
    }

    return pList.toArray(new Integer[pList.size()]);

  } 

  public static Long[] primorialsBelow(Long n) {
    
    ArrayList<Long> pList = new ArrayList<Long>();

    Long primorial=1l;
    int prime=1;

    for(int p=1; primorial<n; p++) {
      
      prime=nextPrime(prime);
      primorial*=prime;
      
      if(primorial<n) {
        pList.add(primorial);
      }
      
    }

    return pList.toArray(new Long[pList.size()]);

  } 

  public static Double[] primorialsBelow(Double n) {

    ArrayList<Double> pList = new ArrayList<Double>();

    Double primorial=1d;
    int prime=1;

    for(int p=1; primorial<n; p++) {
      
      prime=nextPrime(prime);
      primorial*=prime;
      
      if(primorial<n) {
        pList.add(primorial);
      }
      
    }

    return pList.toArray(new Double[pList.size()]);

  } 
  
//  public static Long[] nthPrimorials(int n) {
//    
//    ArrayList<Long> pList = new ArrayList<Long>();
//
//    Long primorial=1l;
//    Long prime=1l;
//
//    for(int p=1; p<=n; p++) {
//      
//      prime=nextPrime(prime);
//      primorial*=prime;
//
//        pList.add(primorial);
//      
//    }
//
//    return pList.toArray(new Long[pList.size()]);
//
//  } 

  public static Double[] nthPrimorials(long n) {
    
    ArrayList<Double> pList = new ArrayList<Double>();

    pList.add(1d);
    
    Double primorial=1d;
    long prime=1l;

    for(int p=1; p<=n; p++) {
      
      prime=nextPrime(prime);
      primorial*=prime;

        pList.add(primorial);
      
    }

    return pList.toArray(new Double[pList.size()]);

  } 
  
//  public static ArrayList<Integer> primorialsBelow(int n) {
//    
//    ArrayList<Integer> pList = new ArrayList<Integer>();
//
//    int primorial=1;
//    int prime=1;
//
//    for(int p=1; primorial<n; p++) {
//      
//      prime=nextPrime(prime);
//      primorial*=prime;
//      
//      if(primorial<n) {
//        pList.add(primorial);
//      }
//      
//    }
//
//    return pList;
////    return pList.primorialsBelow(ntoArray(new Long[pList.size()]);
//
//  } 
  public static ArrayList<Long> primorialsBelow(long n) {
    
    ArrayList<Long> pList = new ArrayList<Long>();

    long primorial=1;
    int prime=1;

    for(int p=1; primorial<n; p++) {
      
      prime=nextPrime(prime);
      primorial*=prime;
      
      if(primorial<n) {
        pList.add(primorial);
      }
      
    }

    return pList;
//    return pList.primorialsBelow(ntoArray(new Long[pList.size()]);

  }

  public static long nthPrimorial(int n) {
    
    long primorial=1;
    int prime=1;
    
    for(int p=1; p<=n; p++) {
      prime=nextPrime(prime);
      primorial*=prime;
    }

    return primorial;
    
  }
  
  public static double nthPrimorial(long n) {
  
    double primorial=1;
    int prime=1;
    
    for(int p=1; p<=n; p++) {
      prime=nextPrime(prime);
      primorial*=prime;
    }
    
    return primorial;
    
  }
  
  public static long[] primeFactorArray(long n) {

    long[] factors=new long[4];
    
    factors[0]=n;
    
    /*  Factors           0 -> number (n)
                          1 -> reserved (r)
        |0|1|2|3|4|5|...  2 -> 1st prime factor base (b)
        |n|r|b|e|b|e|...  3 -> 1st prime factor exponent (e)
                          4 -> 2nd prime factor base (b)
                          5 -> 2nd prime factor exponent (e)
                          ...
    */
    int cursor=2;
    
    while (n%2==0) {
      
      factors[cursor]=2;
      factors[3]++;
      n/=2;
      
    }
    
    if (factors[cursor]>0) {
      cursor+=2;
    }
    
    long[] FACTORS;
    long e=0;
    
    for (long f=3; f<=n; f+=2) {
      
      while (n % f == 0) {

        e++;
        n /= f;
        
      }

      if (e!=0) {
        
        if(factors[factors.length-1]>0) {
          
          FACTORS = new long[factors.length+2];
          
          System.arraycopy(factors, 0, FACTORS, 0, factors.length);
          factors=new long[FACTORS.length];
          System.arraycopy(FACTORS, 0, factors, 0, FACTORS.length);
          
        }
        
        factors[cursor]=f;
        factors[cursor+1]=e;
        
        cursor+=2;

      }

      e=0;

    }

    return factors;

  }

  /* productOfPrimeFactors
     returns the product of unique prime factors of n ------------------*/
  public static int productOfPrimeFactors(int[] factors) {

    int product=1;
    
    for (int i=2; i<factors.length; i+=2) {
        product*=factors[i];
    }
    
    return product;
    
  }
  public static long productOfPrimeFactors(long[] factors) {

    long product=1;
    
    for (int l=2; l<factors.length; l+=2) {
        product*=factors[l];
    }
    
    return product;
    
  }
  
  /* primesBelow
     returns a list of primes below less than of n ---------------------*/
  public static int[] primesLessThan(int n) {
    
    ArrayList<Integer> PRIMES =new ArrayList<Integer>();
    
    int p=0;
    
    while (p<n) {
      
      p=nextPrime(p);
      
      if (p>=n) { break; }
      
      PRIMES.add(p);
      
    }
  
    int length = PRIMES.size();
    
    int[] primes = new int[length];
    
    for (int i=0; i<length; i++) {
      primes[i]=PRIMES.get(i);
    }
    
    return primes;
    
  }
  public static int factorCount(int[] primeFactors) {

    int count = 1;
    
    for (int n=3; n<primeFactors.length; n+=2) {
      count*=(primeFactors[n]+1);
    }
    
    return count;
    
  }
  
  /* isPrimeDivisors
     returns true if all d+d/n are prime where d=divisor----------------*/
  public static boolean isPrimeDivisors(int n) {

    int symmetricDivisors=0;
    
    for (int f=2; f<=Math.sqrt(n); f++) {
      
      if (n%f==0) {
        
        symmetricDivisors = f+n/f;
        
        if(symmetricDivisors%2!=0) {
          if(!isPrime(symmetricDivisors)) {
            return false;
          }
        }
      }
      
    }

    return true;
    
  }
  
//  public static ArrayList<Integer>properFactors(int n) {                             //  properFactors
//  
//    ArrayList<Integer> factors = new ArrayList<Integer>();
//    
//    factors.add(1);
//    
//    for (int f=2; f<n; f++) {
//      
//      if (n%f==0) {
//      
//        factors.add(f);
////        factors.add(n/f);
//      }
//      
//    }
//
//    if (n!=1) { factors.add(n); }
//    
//    return factors;
//    
//  }
  
//  public static ArrayList<Integer> pFactors(int n) {                      //  pFactors
//    
//    ArrayList<Integer> factors = new ArrayList<Integer>();
//    
//    factors.add(1);
//    
//    for (int f=2; f<=Maths.sqrt(n); f++) {
//      
//      if (n%f == 0) {
//
////        System.out.println(n + " : " + f + " : " + n/f);
//        
//        if(!factors.contains(f)) { factors.add(f);    }
//        if(!factors.contains(n/f)) { factors.add(n/f);  }
//        
//      }
//      
//    }
//    
//    Collections.sort(factors);
//    
//    return factors;
//    
//  }
  
}

/*

  If we list all the natural numbers below 10 that are multiples of
  3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

  Find the sum of all the multiples of 3 or 5 below 1000.

    ----------------------
    | Solution: 233 168  |
    ----------------------

*/

  function factorial() { 1,
                         1,
                         2,
                         2*3,
                         2*3*4,
                         2*3*4*5,
                         2*3*4*5*6,
                         2*3*4*5*6*7,
                         2*3*4*5*6*7*8,
                         2*3*4*5*6*7*8*9 };
  
  function factorialDigits(n){
    
    return ceil(log10(2*PI*100)/2+100*(log10(100/E)));
    
  }
  
  var startTime=0;
  var stopTime=0;

  function sqr(n) { return n*n;      };
  // function sqrt(n){ return Math.sqrt(n);  };
  function cube(n){ return Math.pow(n,3); };
  
  function isPerfectSquare(n) { return (n%round(n)==0); };   /*  isPerfectSquare - return true if n is a perfect square -------------*/

  // function abs(n){ return round(Math.abs(n)); }

  function rem(n, m){ return n % m; };                        /*  rem - return the remainder of n/m ----------------------------------*/

  // var PI(){ return PI; }

  function isOdd(n){ return (n & 1) === 1; };
  function isEven(n){ return (n & 1) === 0; };

  function isInt(n) { return n - round(n) === 0; };

  
  /* Geometric Numbers ==========================================================================*/
  
  function triangular(n){ return n*(n+1)/2; };/*  triangular - return the nth triangular number ----------------------*/
  function isTriangular(n){
    
    var sqrt = sqrt(n * 2);

    return (sqrt * (sqrt + 1))/2 === n;
    
  };

  function pentagonal(n)        { return n*(3*n-1)/2;                     };
  function isPentagonal(n)      { return ((sqrt(24*n+1) + 1) % 6 ) === 0; };

  function hexagonal(n)         { return n*(2*n-1);                       };
  function centeredHexagonal(n) { return 1+6*(0.5*n*(n-1));               };
  function isHexagonal(n)       { return ((sqrt(8*n+1) + 1) % 4 ) === 0;  };

  function heptagonal(n)        { return n*(5*n-3)/2;                     };

  function octagonal(n)         { return n*(3*n-2);                       };

  
  /* Digits ==========================================================================*/

  /* isPalindrome
     return true if n is a palindrome ----------------------------------*/
  function isPalindrome(n)      { return n===reverse(n);                  };
  
  /* rightDigit
     returns the right-most digit of n ---------------------------------*/
  function rightDigit(n)        { return n - (n/10 * 10);                 };

  /* leftDigit
     returns the left-most digit of n ----------------------------------*/
  function leftDigit(n){  
    
    while (n>9) {
      n=floor(n/10);
    }
    
    return n;
    
  };

  /* length
     returns the number of digits of n ---------------------------------*/
  function LENGTH(n) {

    var i=0;
    
    while (n > 0) {
      n/=10;
      i++;
    }
    
    return i;
    
  };
  
  /* reverse
     returns the reverse of digits of n --------------------------------*/
  function reverse(n) {

    var i = 0;

    while (n > 0) {

      i = i*10 + Math.floor(n%10);      
      n=Math.floor(n/10);

    }

    return i;

  };

  /* sumOfDigits
     returns the sum of the digits of n --------------------------------*/
  function sumOfDigits(n) {

    var sum=0;
    var digit=0;

    while(n>0) {
      digit=Math.floor(n%10);
      sum+=digit;
      n/=10;
    }

    return sum;

  };
  // var  sumOfDigits(BigInteger n) {

    // String s=n.toString();
    // var sum=0;

    // for (var i=0; i<s.length(); i++) {

      // sum+=Integer.valueOf(s.substring(i, i+1));

    // }

    // return sum;

  // }
  // function sumOfDigits(digitArray) {
    
    // var sum=0;
    
    // for (var d=0; d<digits.length; d++) {
      // sum+=digits[d];
     // System.out.print(digits[d]);
    // }
    
    // return sum;
    
  // }
  
  /*  sortDigits - returns the digits of n sorted --------------------*/
  function sortDigitsDesc(n) {
// console.log(n);
    return reverse(sortDigitsAsc(n));
    
  };
  function sortDigitsAsc(n){

    var digits=[n.length];
    var i=0;

    do    { digits[i++] = parseInt(n%10); }
    while ( parseInt(n=n/10) > 0 );

    digits.sort();

    n=0;
    
    for (var digit in digits){
      n=(10*n + digits[digit]);
    }
    // console.log(n);
    return n;
    
  };

  // function sortDigitsAsc(n) {

    // var digits=[];
    // var i = 0;
    
    // do    { digits[i++] = n%10; }
    // while ((n/=10) > 0);
    
    // digits.sort();
    
    // n=0;
    
    // for (var digit in digits) {
      // n=10*n + digit;
    // }
    
    // return n;

  // };

  /* digitFactorialSum - returns the sum of the factorial of the digits of n */
  function digitFactorialSum(n){
  
    
//    int[] digits=new int[length(n)];
//    var i=0;
    var length=length(n);
    var total=0;
    
    while (length > 0) {      
//      digits[i] = (int) (n%10);
      total+=factorial[floor(n%10)];
      n/=10;
//      i++;
      length--;
    }
    
    return total;
    
  };
  
  /* oddDigits - returns true if all the digits of n are odd -------------*/
  function oddDigits(n){

    var i=0;

    while (n>0) {
    
      i = n - (n/10 * 10);
      
      if ((i&1)==0) { return false; }
//      if (i%2==0) { return false; }
      
      n/=10;
      
    }
    
    return true;
    
  };

  /*  isCircular - returns true if all rotations of the digits of n are prime */
  function isCircular(n){
    
    // var str = String.valueOf(n);
    // var limit = str.length();
    // var val=0;
    
    // if ( n<=11                              ) { return true;  }   //  All single digit primes are circular   
    // if ( Stringses.circularDigits(n)==false ) { return false; }   //  All digits must be odd
    
    // for (var i=1; i<=limit; i++) {
      
      // str = new String(str.substring(1, str.length()) + str.substring(0,1));
      // val = Integer.valueOf(str);
      
      // if (Primes.isPrime(val)==false) { return false; }
      
    // }
  
//    println(n);
    
    // return true;
     
  };

  /* truncateRight - truncates the right digit of n ----------------------*/
  function truncateRight(n)  { return floor(n/10); }
  
  /* truncateLeft
     truncates the right digit of n ------------------------------------*/
  function truncateLeft(n){
    // Change to split?
    return Integer.parseInt(String.valueOf(n).substring(1));
  }
  
  /* digitArray
     returns a 1D array of the digits of n -----------------------------*/
  function digitArray(n){
    
    var digits = [length(n)];
    var i=0;
    var length = digits.length;
    
    while (length > 0) {      
      digits[i] = floor(n%10);
      n/=10;
      i++;
      length--;
    }
    
    return digits;
    
  };
  function digitArrayString(s) {

    // var digits = new int[s.length()];

    // for (var n=0; n<s.length(); n++) {
      // digits[n]=Integer.valueOf(s.substring(n, n+1));
    // }
    
    // return digits;
    
  };
  
  /* isPandigital
     returns true if n is pandigital (1 -> n)---------------------------*/
  function isPanDigital_1n(n) {

    // int[] digits = digitArray(n);
    // var length = digits.length;

     // Sort Ascending
    // Arrays.sort(digits);
    
    // if (digits[0]!=1) { return false; }

    // for (var d=0; d<length-1; d++) {

      // if (digits[d]+1!=digits[d+1]) { return false; }

    // }
    
    // return true;

  };

  /* isPandigital9
     returns true if n is pandigital (1 -> 9) --------------------------*/
  function isPanDigital_9(n) {
    
    // if (sumOfDigits(n)!=45)  { return false; }
    // if (length(n)!=9)        { return false; }    
    
    // var result = 0;
    // long digit=0;
    
    // while ( n>0 ) {
      
      // digit=n%10;
      
      // if (digit==0) { return false; }
 
      // result |= (1 << (digit - 1));
 
      // n/=10;
      
    // }
 
    // return (result == 0x1ff);
    
  };
  
  /* sumOfSquareOfDigits - returns the sum of the square of the digits of n */
  function sumOfSquareOfDigits(n){
    
    var sum=0;
    var digit=0;
    
    while(n>0) {
      digit=floor(n%10);
//      println(n + " : " + digit);
      sum+=(digit*digit);
      n/=10;
    }
    
    return sum;
    
  };
  
  /* isAscending - returns true if the digits of n increase in value -----*/
  function isAscending(n){
    
    if (n<10) { return true; }
    
    var last=floor(n%10);
    
    n/=10;
    
    while (n>=1) {
    
      if (n%10>last) { return false;      }
      else           { last=floor(n%10);
                       n/=10;             }
    }
    
    return true;
    
  };

  /* isDescending - true if the digits of n decrease in value ------------*/
  function isDescending(n){
    
    if (n<10) { return true; }
    
    var last=floor(n%10);
    
    n/=10;
    
    while (n>=1) {
    
      if (n%10<last) { return false;      }
      else           { last=floor(n%10);
                       n/=10;             }
    }

    return true;

  };

  /* isBouncy - true if the digits of n != Ascending of Descending -------*/
  function isBouncy(n){

    if (isAscending(n) ||
        isDescending(n)) { return false; }

    return true;

  };

  /* concatenate - returns n and m concatenated --------------------------*/
  function concatenate(n, m){

    return floor(n * pow(10, length(m)) + m);

  };

  
  
  /* Factorial ==========================================================================*/
  
  /* factorial - returns the factorial value of n ------------------------*/
  function factorial(n){

    var total = 1;

    for (var i=2; i<=n; i++) {
      total*=i;      
    }

    return total;

  };
  
  /* factorial - returns the factorial value of n ------------------------*/
  function factorial(n){

    // BigInteger total = BigInteger.valueOf(1);

    // for (var i=2; i<=n; i++) {

      // total = total.multiply(BigInteger.valueOf(i));

    // }

    // return total;

  };


  
  /* Area - Perimeter ==========================================================================*/
  
  /* triangleArea - returns the area of a triangle -----------------------*/
  function triangleArea(x1, y1,
                        x2, y2,
                        x3, y3){
  
    /*  Heron's Formula: http://en.wikipedia.org/wiki/Heron%27s_formula
        T=sqrt(s(s-a)(s-b)(s-c)) where s = semi-perimeter (perimeter/2) */
    
    var a=sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    var b=sqrt((x3-x2)*(x3-x2)+(y3-y2)*(y3-y2));
    var c=sqrt((x1-x3)*(x1-x3)+(y1-y3)*(y1-y3));
    
    var s=(a+b+c)/2; /*  semi-perimeter (perimeter/2)	*/

    return sqrt(s*(s-a)*(s-b)*(s-c));
    
  };

  
  
  /* Factors ==========================================================================*/
  
  /* totient (phi) - returns the count of positive integers less than or
                     equal to n that are relatively prime to n 
       http://en.wikipedia.org/wiki/Euler's_totient_function -------------*/  
//  var  totient(var n){
//
//    var count=0;
//
//    //  definition of totient: the amount of numbers less than n coprime to n
//    for(var a=1; a<n; a++){ 
//
//      if(gcd(n,a)==1){ //coprime
//        count++;
//      }
//
//    }
//
//    return count;
//
//  }

  function totient(n){

    // long[] factors =  Primes.primeFactorArray((long)n);

    // double product=n;
    
    // for(var e=2; e<factors.length; e+=2){ 

      // product*=(1-(1/(double)factors[e]));

    // }

    // return (int)product;

  };

/*  Note - binary algorithm is 15% -> 60% faster but suffers
           from a lack of readability -------------*/
//  var  gcd(var n, var m) {
//    var shift;
//   
//    /* GCD(0,v) == v; GCD(u,0) == u, GCD(0,0) == 0 */
//    if (n == 0) return m;
//    if (m == 0) return n;
//   
//    /* Let shift := lg K, where K is the greatest power of 2
//          dividing both u and v. */
//    for (shift = 0; ((n | m) & 1) == 0; ++shift) {
//           n >>= 1;
//           m >>= 1;
//    }
//   
//    while ((n & 1) == 0)
//      n >>= 1;
//   
//    /* From here on, u is always odd. */
//    do {
//         /* remove all factors of 2 in v -- they are not common */
//         /*   note: v is not zero, so while will terminate */
//         while ((m & 1) == 0)  /* Loop X */
//             m >>= 1;
//   
//         /* Now u and v are both odd. Swap if necessary so u <= v,
//            then set v = v - u (which is even). For bignums, the
//            swapping is just pointer movement, and the subtraction
//            can be done in-place. */
//         if (n > m) {
//           var t = m; m = n; n = t;}  // Swap u and v.
//         m = m - n;                   // Here v >= u.
//       } while (m != 0);
//   
//    /* restore common factors of 2 */
//    return n << shift;
//    
//  }
  
  /* gcd
     returns the Greatest Common Divisor of n and m
     Note - recursive euclidean algorithm is twice as fast -------------*/
  function gcd(n, m){
//    var r=0;
//    
//    while(m!=0) {
//      
////      println(n + " : " + m);
//      
//      r=m;
//      m=n%m;
//      n=r;
//      
//    }
//    
//    return n;
    if (m === 0){ return n;             }
    else        { return gcd(m, n % m); }

  };

  /* isCoprime - returns if n and m are coprime (gcd = 1) --------------*/
  function isCoprime(n, m){ return gcd(n,m)===1; };

  /* lcm
     returns the Least Common Multiple
     en.wikipedia.org/wiki/Least_common_multiple -----------------------*/
  function lcm(a, b){ return a * (b / gcd(a, b)); };

  function lcmArray(input){

    var result = input[0];

    for(var n=1; n<input.length; n++) {
      result=lcm(result, input[n]);
    }

    return result;

  };

  /* Sum ==========================================================================*/

  /*  sumOfSequence - returns the sum of the sequence --------------------*/
  function sumOfSequence(start,
                         end,
                         difference){
    
    /*  http://en.wikipedia.org/wiki/Arithmetic_progression */
    
    return floor(0.5 * end * ((start<<1) + (end - 1) * difference));
  
  };
  
  /* sumOfList - returns the sum of the list -----------------------------*/
  function sumOfList(a) {

    var sum = 0;

    for(var j=0; j<a.size(); j++) {

      sum+=a.get(j);

    }

    return sum;

  };

  /* sumDivisibleBy - ... ----------------*/
  function sumDivisibleBy(n, limit) {
    
    var p = limit / n;
    
    return (n*(p*(p+1))) / 2;
  
  };

  /* sumOfSquares
     returns the sum of ...
     
         
     Pn = ∑(k=1->n)k² = (n(n=1)(n+2))/6 = (2n² + 3n² +n)/6
     
     en.wikipedia.org/wiki/Square_pyramidal_number
     oeis.org/A000330 --------------------------------------------------*/
  function sumOfSquares(n){ return (((n<<1)+1)*(n+1)*n)/6; };
  
  /* ??? ==========================================================================*/

  function round(Rval, Rpl){

    var p = pow(10,Rpl);
    Rval = Rval * p;
    var tmp = round(Rval);
    return tmp/p;

  };

  //  var sumOfSequence(long n,
//long nth,
//long difference) {
//
//return (long) (0.5 * nth * (2 * n + (nth - 1) * difference));
//
//}
  
  
  /* Misc =====================================================================*/
  
  function squaresBelow(n){
    
    var squares=[];
    
//    println(n);
//    println(squares.length);
//    println(Maths.sqrt(n));
    
    for (var m=1; m<sqrt(n); m++) {
      
      squares[m-1]=m*m;
//      println(m + " : " + squares[m-1]);
      
    }
  
    return squares; 
    
  };
  
  function pythTriplesBelow(limit){

    var sum=0;
    
    var m=0;
    var n=0;
    
    var a = 0;
    var b = 0;
    var c = 0;

    for (m=1; m<limit; m++) {           
      for (n=1; n<m;n++) {

        //  gcd == 1
        if (gcd(m, n)==1) {
         
          // m-n is odd
         if ((m-n)%2!=0) {
  
           
          a = m*m-n*n;
          b = 2*m*n;
          c = m*m+n*n;

//          println(a+b+c);
          
          if (c>=2*limit) { return sum; }
          
          if(a<b) { println(a + " : " + b +  " : " + c); }
          else    { println(b + " : " + a +  " : " + c); }

//          if(c>limit) { break; }

          sum++;

         }

        }
//          for (var k=1; k<=limit; k++) {
//            
//            if(k*c>limit) { break; }
//            
//            sum++;
//            
//            println(k*a + " : " + k*b +  " : " + k*c);
//            
//          }
          
          
          
//          //  Increment array size
//          if(factors[factors.length-1]>0) {
//            
//            FACTORS = new long[factors.length+2];
//            
//            System.arraycopy(factors, 0, FACTORS, 0, factors.length);
//            factors=new long[FACTORS.length];
//            System.arraycopy(FACTORS, 0, factors, 0, FACTORS.length);
//            
//          }
          
//          if ((c*c)==(a*a+b*b) &&
//               c%(Math.abs(a-b))==0) {
  

            
//            k(a,b,c);
            
//          }
          
        }
        
      }
    
    return sum;
    
  };
 
  /* properDivisors
     the smallest (closest to negative infinity) value that is greater than or
     equal to the argument and is equal to a mathematical integer. =====*/
  function ceil(n){ return ceil(n); };
  
  /* powers ===================================================================*/
  
  // function pow(a, b){
    
    // return floor(pow(a, b));
    
  // };

  /* Divisors ===================================================================*/
  
  /* properDivisors
     returns the list of proper divisors (not including n) =============*/
  function properDivisorsList(n) {

    // ArrayList<Integer> factors = new ArrayList<Integer>();

    // factors.add(1);
    
    // var divisor=0;
    
    // for (var f=2; f<=Maths.sqrt(n); f++) {

      // if (n%f === 0){

        // divisor=n/f;

        // if(!factors.contains(f))        { factors.add(f);        }
        // if(!factors.contains(divisor))  { factors.add(divisor);  }

      // }

    // }

    // Collections.sort(factors);

    // return factors;
    
  };

  function properDivisorsArray(n){

    // ArrayList<Integer> factors = new ArrayList<Integer>();

    // factors.add(1);
    
    // var divisor=0;
    
    // for (var f=2; f<=Maths.sqrt(n); f++) {

      // if (n%f == 0) {
        
        // divisor=n/f;

        // if(!factors.contains(f))        { factors.add(f);        }
        // if(!factors.contains(divisor))  { factors.add(divisor);  }

      // }

    // }

    // Collections.sort(factors);
    
    // return factors.toArray(new Integer[factors.size()]);
    
  };
  
  /* Divisors - returns a list of proper divisors (including n) ========*/
  function divisorsList(n){

    // ArrayList<Integer> factors = properDivisorsList(n);

    // factors.add(n);

    // return factors;

  };

  function divisorsArray(n){

    // ArrayList<Integer> factors = properDivisorsList(n);

    // factors.add(n);

    // return factors.toArray(new Integer[factors.size()]);

  };
  
  /* sumOfDivisors
     returns the sum of proper divisors (including n) ==================*/  
  function sumOfDivisors(n){
    
    return n+sumOfProperDivisors(n);

  };

  /* sumOfProperDivisors
     returns the sum of proper divisors (not including n) ==============*/  
  function sumOfProperDivisors(n){

    var sum=1;
    
    for (var f=2; f<n; f++) {
      
      if (n%f == 0) {
        
        sum+=f;
//        sum+=n/f;
       
     }
  
   }
  
   return sum;
  
  }

  // var LIMIT=pow(10, 3)-1;
  
  function sumDivisibleBy() {

    return sumDivisibleBy( 3, LIMIT) + 
           sumDivisibleBy( 5, LIMIT) -
           sumDivisibleBy(15, LIMIT);
  };

  function iterate(){

    var sum=0;

    for (var n=1; n<=LIMIT; n++){
      if (n%3===0 ||
          n%5===0) { sum+=n; }
    }

    return sum;

  };

//   var main=function(){

    // var solution=0;

    /* ---------------------------------------------------------------- */

    // Maths.startTime = System.nanoTime();

    // solution = sumDivisibleBy();

    // Maths.stopTime = System.nanoTime();

    // Stringses.nanoResults("Sum Divisible By", 1, Maths.startTime, Maths.stopTime, solution);

    // println();

    /* ---------------------------------------------------------------- */

    // Maths.startTime = System.nanoTime();

    // solution = iterate();

    // Maths.stopTime = System.nanoTime();

    // Stringses.nanoResults("Iterate", 1, Maths.startTime, Maths.stopTime, solution);

    // println();

    /* ---------------------------------------------------------------- */

//   };

fn main() {
    println!("Welcome to Solana Bootcamp - Homework 4: Fizzbuzz");
    println!("=================================================");

    fizzbuzz();
}

fn fizzbuzz() {
    let mut fizzbuzz_count = 0;

    for i in 1..=301 {
        if i % 15 == 0 {
            fizzbuzz_count += 1;

            println!("fizz buzz");
        } else if i % 3 == 0 {
            println!("fizz");
        } else if i % 5 == 0 {
            println!("buzz");
        }
    }

    println!("\nThere are {} \"fizz buzz\" occurred.", fizzbuzz_count);
}

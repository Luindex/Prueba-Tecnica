function isPalindrome(word: string): boolean {
    const clean = word
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]|\s/g, "");
    return clean === clean.split("").reverse().join("");
}

console.log(isPalindrome("Ana")); 
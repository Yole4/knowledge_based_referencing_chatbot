class HashTable {
    constructor(size) {
        this.size = size;
        this.table = new Array(size).fill(null);
    }

    // Hash Function 1
    hash1(key) {
        return key % this.size;
    }

    // Hash Function 2 (for step size calculation)
    hash2(key) {
        // Should return a positive integer that is relatively prime to this.size
        // In practice, you might use prime numbers close to this.size
        return 7 - (key % 7);
    }

    insert(key, value) {
        let index = this.hash1(key);

        if (this.table[index] === null) {
            this.table[index] = { key, value };
        } else {
            const step = this.hash2(key);

            while (this.table[index] !== null) {
                index = (index + step) % this.size;
            }

            this.table[index] = { key, value };
        }
    }

    search(key) {
        const initialIndex = this.hash1(key);
        let index = initialIndex;
        const step = this.hash2(key);

        while (this.table[index] !== null) {
            if (this.table[index].key === key) {
                return this.table[index].value;
            }
            index = (index + step) % this.size;
            if (index === initialIndex) {
                break; // Avoid an infinite loop
            }
        }

        return null; // Key not found
    }
}

function createHashTable(size) {
    return new HashTable(size);
}

module.exports = {
    createHashTable,
};

// Example usage of the function
const hashTable = createHashTable(11);

// hashTable.insert(5, 'apple');
// hashTable.insert(8, 'banana');
// hashTable.insert(19, 'cherry');

// console.log(hashTable.search(5)); // Output: 'apple'
// console.log(hashTable.search(8)); // Output: 'banana'
// console.log(hashTable.search(19)); // Output: 'cherry'
// console.log(hashTable.search(10)); // Output: null (not found)
// console.log(hashTable);

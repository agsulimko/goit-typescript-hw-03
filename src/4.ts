// У цьому завдання вам належить реалізувати сценарій життя, де людина, ключ і будинок взаємодіють один з одним.

// Ключ (Key): Створіть клас Key. У нього має бути одна приватна властивість signature, яка генерується випадково при створенні об'єкта цього класу (наприклад Math.random()). Також цей клас повинен мати метод getSignature, який повертає значення властивості signature.

// Людина (Person): Створіть клас Person. Конструктор цього класу приймає об'єкт класу Key і зберігає їх у приватному властивості key. Клас Person повинен мати метод getKey, який повертає збережений ключ.

// Дім (House): Створіть абстрактний клас House. Цей клас має дві властивості: door, яка може бути відкрита (true), або закрита (false), і key, яка зберігає об'єкт класу Key. У цьому класі також повинен бути метод comeIn, який додає об'єкт класу Person у масив tenants, якщо door відкрита. Ваш абстрактний клас House також повинен мати абстрактний метод OpenDoor, який приймає об'єкт класу Key.

// Мій будинок (MyHouse): Створіть клас MyHouse, який успадковується від абстрактного класу House. Реалізуйте метод openDoor у цьому класі. Якщо ключ, переданий цьому методу, збігається з ключем, збереженим як key, то двері відчиняються.

// Після реалізації всіх класів створіть об'єкти для кожного класу та спробуйте відтворити сценарій, в якому людина приходить додому.


class Key {
    private signature: number;

    constructor() {
        // Генеруємо випадковий номер для ключа
        this.signature = Math.random();
    }
    // Метод для отримання значення номеру ключа 
    getSignature(): number {
        return this.signature;
    };
}

class Person{
//    людина приймає номер ключа від об'єкту класу Key і зберігає їх у своїй приватному властивості key 
    private key: Key;
    constructor(key: Key) { this.key = key};
// Метод для отримання збереженного номеру ключа 
    getKey():Key{
    return this.key;}
}
// Абстрактний клас House
abstract class House{
    protected door: boolean = false; // По замовчуванню двері закриті
    protected key: Key; // protected-захищені властивості та методи наслідуються.
    protected tenants: Person[] = [];
    constructor(key: Key) {
         this.key = key;
    }

    
    // Створюємо метод comeIn, який додає об'єкт класу Person у масив tenants, якщо двері відкриті
    comeIn(person: Person, ): void {
    if (this.door) {
      this.tenants.push(person);
      console.log(`Людина прийшла до будинку.`);
    } else {
      console.log("Двері закриті. Спершу потрібно відкрити їх.");
    }
  }

// Створюємо абстрактний метод OpenDoor, який приймає об'єкт класу Key.
    abstract openDoor(key: Key):void;
}
// Клас MyHouse успадковується від House
class MyHouse extends House{
    constructor(key: Key,  ) {
    super(key);
}
// Створюємо метод відкриття дверей ключем, якщо номер ключа співподає.
openDoor(key: Key): void {
    if (this.key && key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("Двері відкриті.");
    } else {
      console.log("Неправильний ключ. Двері залишаються закритими.");
    }
  }
}


const myKey = new Key();
// Отримуємо номер ключа 
console.log("Номер ключа:", myKey.getSignature());

// Створюємо об'єкт класу  MyHouse, передаючи йому ключ
const myHouse = new MyHouse(myKey);

// Створюємо об'єкт класу Person, передаючи йому ключ
const person = new Person(myKey);

// Отримуємо ключ з об'єкту Person 
const personKey = person.getKey();
console.log("Номер ключа персони:", personKey.getSignature());




//  Сценарій, в якому людина приходить додому
console.log("Двері закриті.");
myHouse.comeIn(person); // Двері закриті. Людина не може увійти.

myHouse.openDoor(new Key()); // Неправильний ключ. Двері залишаються закритими.

myHouse.openDoor(myKey); // Двері відчинені.
myHouse.comeIn(person); // Людина увійшла в будинок.

export {};
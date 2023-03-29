import './styles.css';

class LinkedListElement {
    value = null;
    nextMember = null;
    previousMember = null;

    constructor(value, nextMember, previousMember) {
        this.value = value;
        this.nextMember = nextMember;
        this.previousMember = previousMember;
    }
}

class LinkedList {
    #head = null;
    #tail = null;

    getCount() {
        let currentMember = this.#head;
        let counter = 0;
        while (currentMember != null) {
            counter += 1;
            currentMember = currentMember.nextMember;
        }
        return counter;
    }

    addToTail(value) {
        let newMember = null;
        console.log('adding ' + value);
        if(this.#head === null) {
            this.#head = new LinkedListElement(value, null, null);
            this.#tail = this.#head;
        } else if(this.#head.nextMember === null) {
            newMember = new LinkedListElement(value, null, this.#head);
            this.#head.nextMember = newMember;
        } else {
            newMember = new LinkedListElement(value, null, this.#tail)
            this.#tail.nextMember = newMember;
        }
        this.#tail = newMember;
    }

    toArray() {
        let currentMember = this.#head
        const array = [];
        while(currentMember !== null) {
            array.push(currentMember);
            currentMember = currentMember.nextMember;
        }
        return array;
    }

    remove(positionInLine) {
        let currentMemeber = this.#head;
        let nextInLine = this.#head;
        let previousInLine = this.#head;
        let counter = 1;

        if (counter === positionInLine) {
            this.#head = this.#head.nextMember;
            this.#head.previousMember = null
            currentMemeber = null;
            return
        } else {
            while (counter !== positionInLine) {
                if (currentMemeber.nextMember.nextMember === null && positionInLine === counter + 1) {
                    currentMemeber = currentMemeber.nextMember;
                    previousInLine = currentMemeber.previousMember
                    currentMemeber = null;
                    previousInLine.nextMember = null;
                    return;
                } else if (counter + 1 === positionInLine) {
                    currentMemeber = currentMemeber.nextMember
                    nextInLine = currentMemeber.nextMember;
                    nextInLine.previousMember = currentMemeber.previousMember;
                    currentMemeber.previousMember.nextMember = nextInLine;
                    currentMemeber = null;
                    return;
                } else {
                    currentMemeber = currentMemeber.nextMember;
                    nextInLine = currentMemeber.nextMember;
                    counter += 1;
                }
            }
        }
    }

    reverse() {
        let currentMemeber = this.#head
        let nextInLine = null;
        let previousInLine = null;
        while (currentMemeber !== null) {
            nextInLine = currentMemeber.nextMember;
            currentMemeber.nextMember = previousInLine;
            if (currentMemeber.previousMember === null) {
                currentMemeber.previousMember = nextInLine;
                previousInLine = currentMemeber;
                currentMemeber = nextInLine;
            } else {
                currentMemeber.previousMember = nextInLine;
                previousInLine = currentMemeber;
                currentMemeber = nextInLine;
            }
        }
        this.#head = previousInLine;
        return
    }

    switchPositions(leftElement, rightElement) {
        let leftMember = null;
        let leftMemberPrevious = null;
        let leftMemberNext = null;

        let rightMember = null;
        let rightMemberPrevious = null;
        let rightMemberNext = null;

        let currentMemeber = this.#head;

        while (leftMember === null || rightMember === null) {
            if (currentMemeber.value === leftElement) {
                leftMember = currentMemeber;
                leftMemberPrevious = leftMember.previousMember;
                leftMemberNext = leftMember.nextMember;
                currentMemeber = currentMemeber.nextMember;
            } else if (currentMemeber.value === rightElement) {
                rightMember = currentMemeber
                rightMemberPrevious = rightMember.previousMember;
                rightMemberNext = rightMember.nextMember;
            } else {
                currentMemeber = currentMemeber.nextMember;
            }
        }
        if (leftMember.previousMember) {
            leftMember.previousMember.nextMember = rightMember;
        }
        if (leftMember.nextMember) {
            leftMember.nextMember.previousMember = rightMember;
        }
        if (rightMember.previousMember) {
            rightMember.previousMember.nextMember = leftMember;
        }
        if (rightMember.nextMember) {
            rightMember.nextMember.previousMember = leftMember;
        }
        leftMember.nextMember = rightMemberNext;
        leftMember.previousMember = rightMemberPrevious;
        rightMember.nextMember = leftMemberNext;
        rightMember.previousMember = leftMemberPrevious;
        return;
    }

    addBetween(previousElement, nextElement) {

    }
}

const list = new LinkedList();
const numberTwelve = 12;
const numberFive = 5;
const numberSixtySeven = 67;
const numberSeventyEight = 78;
const numberNinetyNine = 99;
list.addToTail(numberTwelve);
list.addToTail(numberFive);
list.addToTail(numberSixtySeven);
list.addToTail(numberSeventyEight);
list.addToTail(numberNinetyNine);

// console.log(list.getCount());

// list.reverse();

list.switchPositions(numberTwelve, numberSeventyEight);

// list.remove(5)

console.log(list.toArray());

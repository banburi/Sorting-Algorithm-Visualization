function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(arr) {
    let n = arr.length;
    let swapped;
    do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        updateVisualization(arr);
        swapped = true;
        await sleep(100);
        }
    }
    } while (swapped);
}

async function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
        minIndex = j;
        }
    }
    if (minIndex !== i) {
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        updateVisualization(arr);
        await sleep(100);
    }
    }
}

async function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
    updateVisualization(arr);
    await sleep(100);
    }
}

async function quickSort(arr, low, high) {
    if (low < high) {
    let pivotIndex = await partition(arr, low, high);
    await quickSort(arr, low, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
        i++;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        updateVisualization(arr);
        await sleep(100);
    }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    updateVisualization(arr);
    await sleep(100);
    return i + 1;
}

async function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    updateVisualization(arr);
    await sleep(100);
    await heapify(arr, i, 0);
    }
}

async function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) {
    largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
    largest = right;
    }
    if (largest !== i) {
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    updateVisualization(arr);
    await sleep(100);
    await heapify(arr, n, largest);
    }
}

async function countingSort(arr) {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
    }

    for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
    }

    for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
    updateVisualization(arr);
    await sleep(100);
    }
}

function updateVisualization(arr) {
    const bars = document.getElementById("bars");
    bars.innerHTML = "";
    for (let value of arr) {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = (value * 25 + 5) + "px"; // Adjust the range here
    bars.appendChild(bar);
    }
}

async function startBubbleSort() {
    const arr = generateRandomArray(150); // Change the array size here
    await bubbleSort(arr);
}

async function startSelectionSort() {
    const arr = generateRandomArray(150); // Change the array size here
    await selectionSort(arr);
}

async function startInsertionSort() {
    const arr = generateRandomArray(150); // Change the array size here
    await insertionSort(arr);
}

function generateRandomArray(size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 20) + 1); // Random values between 1 and 20
    }
    return arr;
}

async function startQuickSort() {
    const arr = generateRandomArray(150);
    await quickSort(arr, 0, arr.length - 1);
}

async function startHeapSort() {
    const arr = generateRandomArray(150);
    await heapSort(arr);
}

async function startCountingSort() {
    const arr = generateRandomArray(150);
    await countingSort(arr);
}

window.onload = () => {
    const arr = generateRandomArray(150); // Change the initial array size here
    updateVisualization(arr);
};

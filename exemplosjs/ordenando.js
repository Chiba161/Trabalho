// Função para trocar os valores de duas posições de um vetor
const swap = (array, pos1, pos2) => {
    [array[pos1], array[pos2]] = [array[pos2], array[pos1]];
};

// Função para embaralhar os elementos de um vetor
const shuffle = (array, numOfSwaps) => {
    for (let i = 0; i < numOfSwaps; i++) {
        const randomIndex1 = Math.floor(Math.random() * array.length);
        const randomIndex2 = Math.floor(Math.random() * array.length);
        swap(array, randomIndex1, randomIndex2);
    }
};

// Função para ordenar um vetor com o algoritmo Bubble Sort
const bubble_sort = (array) => {
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
            }
        }
    }
};

// Função para ordenar um vetor com o algoritmo Selection Sort
const selection_sort = (array) => {
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        if (min !== i) {
            swap(array, i, min);
        }
    }
};

// Função para ordenar um vetor com o algoritmo Quick Sort
const quick_sort = (array, left = 0, right = array.length - 1) => {
    if (left < right) {
        const pivotIndex = particionamento(array, left, right);
        quick_sort(array, left, pivotIndex - 1);
        quick_sort(array, pivotIndex + 1, right);
    }
};

// Função de particionamento (apoio ao Quick Sort)
const particionamento = (array, left, right) => {
    const pivot = array[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (array[j] <= pivot) {
            i++;
            swap(array, i, j);
        }
    }
    swap(array, i + 1, right);
    return i + 1;
};

module.exports = {
    swap,
    shuffle,
    bubble_sort,
    selection_sort,
    quick_sort,
    particionamento
};

function rotateMatrix(matrix: number[][]): number[][] {
    const N = matrix.length;

    if (N === 0 || matrix[0].length !== N) {
        return matrix;
    }
    for (let i = 0; i < N; i++) {
        for (let j = i; j < N; j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    for (let i = 0; i < N; i++) {
        matrix[i].reverse();
    }

    return matrix;
}
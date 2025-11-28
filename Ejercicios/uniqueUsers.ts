//Lista de Usuarios
const users = [
    { id: 1, name: "Ana" },
    { id: 2, name: "Carlos" },
    { id: 1, name: "Ana Duplicate" },
];

function uniqueUsers(list: typeof users) {
    const seen = new Set();
    return list.filter(u => {
        if (seen.has(u.id)) return false;
        seen.add(u.id);
        return true;
    });
}

console.log(uniqueUsers(users));
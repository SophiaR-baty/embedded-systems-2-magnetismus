// constants
// magnetische Feldkonstante
const mu0 = 1.2566370612720e-6;

// html elements
const input_z = document.getElementById("input-z");
const input_N = document.getElementById("input-N");
const input_I = document.getElementById("input-I");
const input_R = document.getElementById("input-R");
const input_mur = document.getElementById("input-mur");
const input_r = document.getElementById("input-r");

const output_F = document.getElementById("output-F");

// calculation functions
// flussdichte
function calcB(z, N, I, R) {
    return (mu0 * N * I * R * R) / (2 * (R*R + z*z)**(3/2));
}
// feldstärke
function calcH(z, N, I, R) {
    return (N * I * R * R) / (2 * (R*R + z*z)**(3/2));
}
// Magnetisierung
function calcM(z, N, I, R, chi) {
    let H = calcH(z, N, I, R);
    return chi * H;
}
// Volumen Kugel
function calcV(r) {
    return 4/3 * Math.PI * r**3;
}
// Magnetisierung
function calcm(z, N, I, R, r, chi) {
    let M = calcM(z, N, I, R, chi);
    let V = calcV(r);
    return M * V;
}
function calcU(z, N, I, R, r,chi) {
    let B = calcB(z, N, I, R);
    let m = calcm(z, N, I, R, r, chi);
    return -m * B;
}
function calcF(z, N, I, R, r,chi) {
    let step = 0.00001;
    let U_z = calcU(z,N,I,R,r,chi);
    let U_z1 = calcU(z+step,N,I,R,r,chi);
    return -(U_z1 - U_z)/step;
}

// main function (when loaded)
window.addEventListener("DOMContentLoaded", function() {
    
});

const numericInputs = document.getElementsByClassName("numeric-input");
numericInputs.forEach(input => function() {
    input.addEventListener('input', function() {
        // Regular expression to allow digits, +, -, and decimals
        const regex = /^-?\d*\.?\d*$/;
        
        // Check if the current value matches the regex
        if (!regex.test(this.value)) {
            this.value = this.value.slice(0, -1); // Remove the last invalid character
        }
    });
});



input_N.addEventListener("input", function(){
    updateResults();
});

input_z.addEventListener("input", function(){
    updateResults();
});

input_I.addEventListener("input", function(){
    updateResults();
});

input_R.addEventListener("input", function(){
    updateResults();
});

input_mur.addEventListener("input", function() {
    updateResults();
});

input_r.addEventListener("input", function(){
    updateResults();
});


function updateResults(){
    let z = Number(input_z.value);
    let N = Number(input_N.value);
    let I = Number(input_I.value);
    let R = Number(input_R.value);
    let mu_r = Number(input_mur.value);
    let chi = Number(mu_r - 1);
    let r = Number(input_r.value);

    output_F.innerText = calcF(z, N, I, R, r, chi);

}
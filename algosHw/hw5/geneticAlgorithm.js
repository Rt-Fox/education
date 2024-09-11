const MAXPOP = 50

function getRandomInt(max) {

    return Math.floor(Math.random() * max);
}

function getRandomFloat(max) {

    return Math.random() * max;
}

class Gene {
    constructor() {
        this.alleles = new Array(4);
        this.fitness = null;
        this.likelihood = null;
    }
}

class CDiophantine {
    constructor(a, b, c, d, result) {
        this.result = result

        this.ca = a;
        this.cb = b;
        this.cc = c;
        this.cd = d;

        this.population = new Array(MAXPOP).fill(null).map(()=> (new Gene()));
    }


    solve() {
        let fitness = -1;
        for (let i = 0; i < MAXPOP; i++) {
            for (let j = 0; j < 4; j++) {
                this.population[i].alleles[j] = getRandomInt(this.result + i);
            }
        }

        fitness = this.createFitnesses()
        if (fitness) {
            return fitness;
        }

        let iterations = 0;
        while (iterations < 50) {
            this.generateLikelihoods();
            this.createNewPopulation();

            fitness = this.createFitnesses()
            if (fitness) {
                return fitness;
            }

            iterations++;
        }

        return -1;
    }

    fitness(population) {
        let total = this.ca * population.alleles[0] + this.cb * population.alleles[1] + this.cc * population.alleles[2] + this.cd * population.alleles[3];
        return population.fitness = Math.abs(total - this.result);
    }

    createFitnesses() {
        let fitness = 0;
        for (let i = 0; i < MAXPOP; i++) {
            fitness = this.fitness(this.population[i]);
            if (fitness === 0) {
                return i;
            }
        }

        return 0;
    }

    getGene(i) {
        return this.population[i];
    }

    multInv() {
        let sum = 0;

        for (let i = 0; i < MAXPOP; i++) {
            sum += 1.0 / (this.population[i].fitness);
        }

        return sum;
    }

    generateLikelihoods() {
        let multinv = this.multInv();
        let last = 0;
        for (let i = 0; i < MAXPOP; i++) {
            this.population[i].likelihood = last + ((1.0 / (this.population[i].fitness) / multinv) * 100);
            last += ((1.0 / (this.population[i].fitness) / multinv) * 100)
        }
    }

    getIndex(val) {
        let last = 0;
        for (let i = 0; i < MAXPOP; i++) {
            if (last <= val && val <= this.population[i].likelihood) {
                return i
            } else {
                last = this.population[i].likelihood
            }
        }

        return 4;
    }

    breed(p1, p2) {
        let crossover = getRandomInt(4);
        let first = getRandomInt(100);

        let child = JSON.parse(JSON.stringify(this.population[p1]));

        let initial = 0;
        let final = 3;

        if (first < 50) {
            initial = crossover
        } else {
            final = crossover + 1
        }

        for (let i = initial; i < final; i++) {
            child.alleles[i] = JSON.parse(JSON.stringify(this.population[p2].alleles[i]));
            if (getRandomInt(101) < 5) {
                child.alleles[i] = getRandomInt(this.result + 1)
            }
        }

        return child;
    }

    createNewPopulation() {
        let temppop = new Array(MAXPOP).fill(null).map(()=> (new Gene()));

        for (let i = 0; i < MAXPOP; i++) {
            let parent1 = 0;
            let parent2 = 0;
            let iterations = 0;
            while(parent1 === parent2 || JSON.parse(JSON.stringify(this.population[parent1].alleles)) === JSON.parse(JSON.stringify(this.population[parent2].alleles))) {
                parent1 = this.getIndex(getRandomFloat(101));
                parent2 = this.getIndex(getRandomFloat(101));
                if (++iterations > 25) break;
                }

            temppop[i] = JSON.parse(JSON.stringify(this.breed(parent1, parent2)));

        }
        for (let i = 0; i < MAXPOP; i++) this.population[i] = JSON.parse(JSON.stringify(temppop[i]))
    }

}


function main() {
    let dp = new CDiophantine(1, 2, 3, 4, 30);
    let ans = dp.solve();
    if (ans === -1) {
        console.log('No solution found')
    } else {
        let gn = dp.getGene(ans)
        console.log(`1*${gn.alleles[0]} + 2*${gn.alleles[1]} + 3*${gn.alleles[2]} + 4*${gn.alleles[3]} = 30`)
    }
}

main()
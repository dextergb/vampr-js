class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentOffspring = this;

    while (currentOffspring.creator) {
      currentOffspring = currentOffspring.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    );
  }
  /** Tree traversal methods **/

  /******Implement each method using DEPTH First Traversal.****/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (name === this.name) {
      return this;
    }
    for (let vampire of this.offspring) {
      let nameExists = vampire.vampireWithName(name);

      if (nameExists) {
        return nameExists;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;

    for (let vampire of this.offspring) {
      count += vampire.totalDescendents + 1;
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let array = [];
    if (this.yearConverted > 1980) {
      array.push(this);
    }
    for (let vampire of this.offspring) {
      array = array.concat(vampire.allMillennialVampires);
    }
    return array;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {}
}

module.exports = Vampire;

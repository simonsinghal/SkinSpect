class Doctor {
    constructor(id, name, vicinity, geometry, rating, user_ratings_total) {
        this.id = id;
        this.name = name;
        this.vicinity = vicinity;
        this.geometry = geometry;
        this.rating = rating;
        this.user_ratings_total = user_ratings_total;
    }
}

module.exports = Doctor;
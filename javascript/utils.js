
// Pitagora
function getDistanceBetweenPoints(xA, yA, xB, yB){
    let xDistance = xB - xA;
    let yDistance = yB - yA;
    return Math.hypot(xDistance, yDistance);
}

// se la distanza tra i cerchi è minore della somma dei 2 raggi delle
// hitbox allora c'è una collsione. Gli oggetti devono avere i campi x, y, radius
function collisionBetweenCircles(entityA, entityB){
    let distance = getDistanceBetweenPoints(
        entityA.getHitbox().getX(), 
        entityA.getHitbox().getY(), 
        entityB.getHitbox().getX(), 
        entityB.getHitbox().getY()
    );
    //let sumRadius = entityA.radius + entityB.radius;
    //console.log('distance: '+distance+' sumRadius: '+sumRadius);
    if(distance <= (entityA.getHitbox().getRadius() + entityB.getHitbox().getRadius())){
        return true;
    }else{
        return false;
    }
}

/* Sort array elements by ...*/
function sortArrayByHitbox(array) {
    array.sort(function(a, b){
        // aggiungo alla y, metà della sprite
        if(a.y+a.getHitbox().getY() < b.y+b.getHitbox().getY()) return -1;
        if(a.y+a.getHitbox().getY() > b.y+b.getHitbox().getY()) return 1;
        return 0;
    });
}
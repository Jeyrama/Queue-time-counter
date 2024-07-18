/*
You managed to send your friend to queue for tickets in your stead, but there is a catch: 
he will get there only if you tell him how much that is going to take. 

Everybody can only take one ticket at a time, 
then they go back in the last position of the queue 
if they need more (or go home if they are fine).

Each ticket takes one minute to emit, the queue is well disciplined, 
Brit-style, and so it moves smoothly, with no waste of time.

You will be given an array with all the people queuing and the initial position of your buddy, 
so for example, knowing that your friend is in the third position 
(that we will consider equal to the index, 2. He is the guy that wants 3 tickets!) 
and the initial queue is [2, 5, 3, 4, 6].

The first guy gets his ticket and the queue goes now like this [5, 3, 4, 6, 1], 
then [3, 4, 6, 1, 4] and so on. 
In the end, our buddy will be queuing for 12 minutes.

Build a function to compute it, 
rest assured that only positive integers are going to be there 
and you will be always given a valid index; 
but we also want to go to pretty popular events, 
so be ready for big queues with people getting plenty of tickets.
*/


// Solution

function queue(queuers, pos){
  let wait = 0;
  
  for(let i = 0; i < queuers.length; i++) {
    if(i <= pos) {
      wait += Math.min(queuers[i], queuers[pos]);
    } else {
      wait += Math.min(queuers[pos]-1, queuers[i]);
    }
  }
  
  return wait;
}

// or

function queue(queuers, pos){
  // Store the number of tickets we need
  let tickets = queuers[pos];
  
  // Store a copy of the passed in queue
  let currentQueue = [...queuers];
  
  // Counter for the number of minutes elapsed
  let minutes = 0;

  // Lets loop as long as tickets required is > 0
  while (tickets) {
    // Is our friend at the front of the queue
    if (pos == 0) {
      // Lets give our friend a ticket and take them out of the queue
      tickets--;
      currentQueue.shift();
      
      // If our friend still needs tickets, put them at the back of the queue
      if (tickets) {
        currentQueue.push(tickets)
        // Lets update our friends position to the back of the queue
        pos = currentQueue.length - 1;
      }
    } 
    // Our friend is somewhere else in the queue
    else {
      // Get the person at the front of the queue
      let front = currentQueue.shift();
      // Decrement their ticket counter
      front--;
      
      // Do they need more tickets?
      if (front > 0){
        // Send them to the back of the queue
        currentQueue.push(front);
      } // We can omit an else statement here, if the persons tickets required is 0, they can go home (don't add them back into the queue)
      
      // Our friend has moved up the queue so decrement their position
      pos--;
    }
    // Lets increment minutes as someone has gotten their ticket
    minutes++;
  }
  // We've now calculated minutes, so return it
  return minutes;
}
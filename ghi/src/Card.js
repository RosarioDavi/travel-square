import Card from 'react-bootstrap/Card';


// function TextExample() {
//   return (
//     <Card style={{ width: '18rem' }}>
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Card.Link href="#">Write a Review</Card.Link>
//         <Card.Link href="#">See All Reviews</Card.Link>
//       </Card.Body>
//     </Card>
    

//   );
// }

// export default TextExample;


import './card.css';
function TextExample() {
  return (
    <div class="row">
      <div class="column">
        <div class="card">
        <Card.Link href="#">Write a Review</Card.Link>
        <Card.Link href="#">See All Reviews</Card.Link>
        </div>
      </div>
      <div class="column">
        <div class="card">     
        <Card.Link href="#">Write a Review</Card.Link>
        <Card.Link href="#">See All Reviews</Card.Link></div>
      </div>
      <div class="column">
        <div class="card">. 
        <Card.Link href="#">Write a Review</Card.Link>
        <Card.Link href="#">See All Reviews</Card.Link>.</div>
      </div>
      <div class="column">
        <div class="card">
        <Card.Link href="#">Write a Review</Card.Link>
        <Card.Link href="#">See All Reviews</Card.Link>
        </div>
      </div>
    </div>
  );
}

export default TextExample;
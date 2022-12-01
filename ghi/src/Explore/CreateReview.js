import React from 'react';

function WriteReview(props){
    const [review, setReview] = useState('');

    render() {
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <form onSubmit={this.handleSubmitChange} id="create-service-form">


              <div className="form-floating mb-3">
                <input onChange={this.handleReviewDescription} value={this.state.review_description} placeholder="Review Description" required type="text" name="review_description" id="review_description" className="form-control" />
                <label htmlFor="review_description">Review Description</label>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

}

export default WriteReview









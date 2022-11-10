### Get Locations
* Endpoint path: /locations
* Endpoint method: GET
* Query parameters:
    * location: get places in this location
    * category: get places in this category

* Headers:
    * Authorization: Bearer token

* Response: A list of reviews
* Response shape:
    ```json
    {
        "locations": [
            {
                "added_by": {
                                username: string,
                                name: string
                            },
                "address": string,
                "picture_url": string,
                "name": string,
                "loved_by": array of users,
                "associated_reviews": reviews(string)
            }
        ]
    }
    ```

### Create Location
* Endpoint path: /locations
* Endpoint method: POST

* Headers:
    * Authorization: Bearer token

* Request body:
    ```json
    {
        "name": string,
        "picture_url": string,
        "address": string
    }
    ```

* Response: Success or failure
* Response shape:
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```

### Love a Location
* Endpoint path: /locations/{location}
* Endpoint path: PUT

* Headers:
    * Authorization: Bearer token

* Request body:
    (Have the backend increment loves by 1 on request)

* Response: Success or failure
* Response shape:
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```

### Get Reviews
* Endpoint path: /reviews
* Endpoint method: GET

* Headers:
    * Authorization: Bearer token

* Response: A list of reviews
* Response shape:
    ```json
    {
        "reviews": [
            {
                "user": {
                            username: string,
                            name: string
                        },
                "picture_url": string,
                "date_posted": date,
                "loved_by": array of users,
                "name": string,
                "text": string
            }
        ]
    }
    ```

### Create Review
* Endpoint path: /reviews
* Endpoint method: POST

*Headers:
    *Authorization: Bearer token

*Request body:
    ```json
    {
        "name": (place_id)number,
        "picture_url": string,
        "text": string
    }
    ```

### Like Review
* Endpoint Path: /reviews/{review}
* Endpoint method: PUT

* Headers:
    * Authorization: Bearer token

* Request body:
    (Have backend increment likes
       by 1 on request, add their user
      to liked array)

* Response: Success or failure
* Response shape:
    ```json
    {
        "success": boolean,
        "message": string
    }
    ```

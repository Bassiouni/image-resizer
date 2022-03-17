# Image Processing API

Here's how to test the API using `npm run` command:

- `start`: builds the project and starts the server
- `test`: builds and run th tests contained in `src/tests`
- `dev`: start `nodemon` on `src/index`
- `clean`: remove `build` folder
- `build`: run typescript compiler && output the result in `build` directory
- `format`: uses prettier to format the code
- `lint`: uses ESLint to lint the code
- `lint:fix`: linting and fixing

## Usage

Server port is 3000

The only existing endpoint is `/api/images` and you have to give it query params (filename - width - height) to work

## Notes

- The API doesn't allow for negative numbers or wrong typee of parameters you give in the query param

- Images are stored in `storage/images`

- The output file is `storage/thumbs` and is created when hitting the endpoint for the first time

## Example

<http://localhost:3000/api/images?filename=fjord&width=400&height=200>

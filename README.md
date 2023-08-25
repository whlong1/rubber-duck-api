<img src="assets/landing.png"/>

## rubber-duck-api

Developed during a 48-hour hackathon at General Assembly, Rubber Duck is a web application designed to help users practice The Feynman Technique. Users explore topics in their field of expertise and endeavor to convey a clear and succinct explanation of the subject matter. After sharing an explanation, it becomes open to community feedback. Users can then refine their synopsis through multiple iterations, allowing others to observe the evolution of the explanation over time. The application also provides real-time writing feedback and keyword suggestions derived from related posts. You can learn more about the Feynman Technique [here](https://law-hawaii.libguides.com/notetaking/feynman).

> Please note, this is the backend server for Rubber Duck. To run the client app, please visit the [rubber-duck-client](https://github.com/whlong1/rubber-duck-client.git) repository for instructions.

## Getting Started

To run the Rubber Duck backend server on your local machine, follow these steps:

1. Clone this repository:

    ```bash
    git clone https://github.com/whlong1/rubber-duck-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd rubber-duck-api
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory with the following variables:

    ```
    DATABASE_URL=[MongoDB Connection String]
    ```

5. Start the development server:

    ```bash
    nodemon
    ```
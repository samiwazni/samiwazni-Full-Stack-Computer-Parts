# PC Building Web Application

Welcome to the Custom PC Building Web Application! This platform allows you to explore, customize, and understand the various components needed to build a personal computer. From CPUs to power supplies, you can view detailed information about computer parts along with their costs to make informed decisions for building your custom PC.

The database for this project is populated using a Python script that automatically scrapes and updates component data from [Jimms' website](https://www.jimms.fi/). This ensures that the component listings are up-to-date with the latest prices and specifications.

I didn't include the Python script code in this project

## Technologies Used

This project is built using:
- **Node.js**: For server-side logic
- **React**: For building the user interface
- **SQLite**: For the database
- **Bootstrap**: For styling and responsive design

## Features

- **Component Listings**: Browse individual components like CPUs, GPU cases, coolers, memories, motherboards, storage solutions, and power supply units.
- **Cost of pieces**: Estimate your build expenses.
- **API Access**: Fetch data about components through a RESTful API.

## How to Set Up and Run the Project

### Prerequisites
Make sure you have `Node.js` and `npm` (Node Package Manager) installed on your computer.

### Installation

1. Clone the repository
```bash
git clone https://github.com/samiwazni/samiwazni-Full-Stack-Computer-Parts/
```
2. Install dependencies:
```bash
npm install
```

### Running the Project

To run the server and client concurrently:
This project is full-stack where you need to run the server side and client side at the same time
Created one command to run both at the same time, just run `npm run dev` in the terminal
```bash
npm run dev
```

### Accessing the API

After running the server, access the RESTful API via:
```bash
http://localhost:4000/api/{endpoint}
```
Replace `{endpoint}` with one of the following to fetch data for different components:
- `cpus`
- `cases`
- `cpucoolers`
- `gpus`
- `memories`
- `motherboards`
- `storages`
- `psus`


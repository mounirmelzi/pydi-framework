from fastapi import FastAPI
import uvicorn
import crud


app = FastAPI()


@app.get("/users")
def get_users():
    return crud.get_users()


@app.post("/users")
def create_user(name: str, email: str):
    return crud.create_user(name, email)


if __name__ == "__main__":
    uvicorn.run(app)

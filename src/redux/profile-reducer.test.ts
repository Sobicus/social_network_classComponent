import {addPostAC, deletePostAC, profileReducer} from "./profile-reducer";

let state = {
    postsData: [
        {id: 1, message: 'It`s my first post', likesCounter: 1},
        {id: 2, message: 'Hi, how are you?', likesCounter: 5},
        {id: 3, message: 'GO GO GO?', likesCounter: 7},
        {id: 4, message: 'Test props', likesCounter: 13},
    ],
    profile:
        {
            "aboutMe": "я круто чувак 11%",
            "contacts": {
                "facebook": "facebook.com",
                "website": "null",
                "vk": "vk.com/dimych",
                "twitter": "https://twitter.com/@sdf",
                "instagram": "instagra.com/sds",
                "youtube": "null",
                "github": "github.com",
                "mainLink": "null"
            },
            "lookingForAJob": true,
            "lookingForAJobDescription": "не ищу, а дурачусь",
            "fullName": "samurai dimych",
            "userId": 2,
            "photos": {
                "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
                "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
            }
        },
    status: 'Field for status',
    errorMessage: ''
}

it('new post should be added', () => {
    let action = addPostAC('first test')

    let newState = profileReducer(state, action)
    expect(newState.postsData.length).toBe(5)

})
test('new post likesCouner expexted', ()=>{
    let action = addPostAC('first test')

    let newState = profileReducer(state, action)
    expect(newState.postsData[4].likesCounter).toBe(1)
})
test('new post check message', ()=>{
    let action = addPostAC('first test')

    let newState = profileReducer(state,action)
    expect(newState.postsData[4].message).toBe('first test')
})
test('after deleting length of messages should be decrement', ()=>{
    let action = deletePostAC(1)

    let newState=profileReducer(state, action)
    expect(newState.postsData.length).toBe(3)
})
test('after deleting length should`t be decrement if id is incorrect', ()=>{
    let action = deletePostAC(1000)
    let newState=profileReducer(state,action)
    expect(newState.postsData.length).toBe(4)
})
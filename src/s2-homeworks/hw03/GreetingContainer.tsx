import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'

type GreetingContainerPropsType = {
    users: UserType[] // need to fix any
    addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (name: string,
                            setError: (error: string) => void,
                            setName: (name: string) => void,
                            addUserCallback: (name: string) => void) => {
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
    const trimmedName = name.trim();
    if (!trimmedName) {
        setError('Ошибка! Введите имя!');
        return;
    }
    addUserCallback(trimmedName); // передаем очищенное имя
    setName('');
    setError('');
}

export const pureOnBlur = (name: string, setError: (error: string) => void) => {
    if (!name.trim()) {
        setError('Ошибка!Введите имя!')// если имя пустое - показать ошибку
    }
}

    export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => {
        if (e.key === 'Enter') {
            addUser()
        }// если нажата кнопка Enter - добавить
    }


// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
    const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                         users,
                                                                         addUserCallback,
                                                                     }) => {
        // деструктуризация пропсов
        const [name, setName] = useState<string>('') // need to fix any
        const [error, setError] = useState<string>('') // need to fix any

        const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            setName(value);

            // Всегда очищаем ошибку при любом вводе (если поле не пустое)
            if (value.trim()) {
                setError('');
            }
        }
        const addUser = () => {
            pureAddUser(name, setError, setName, addUserCallback)
        }

        const onBlur = () => {
            pureOnBlur(name, setError)
        }

        const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
            pureOnEnter(e, addUser)
        }

        const totalUsers = users.length // общее количество пользователей
        const lastUserName = users.length > 0 ? users[users.length - 1].name : ''//need to fix
        console.log(typeof(totalUsers))

        return (
            <Greeting
                name={name}
                setNameCallback={setNameCallback}
                addUser={addUser}
                onBlur={onBlur}
                onEnter={onEnter}
                error={error}
                totalUsers={totalUsers}
                lastUserName={lastUserName}
            />
        )
    }

        export default GreetingContainer

import React from 'react';
import ReplyDisplay from '../components/replyDisplay';
import CommentDisplay from '../components/commentDisplay';

function TestPage() {
    return (
        <div>
            <CommentDisplay replyList={exampleReplyList} comment='This is an example comment' user='User' date='10/10/2021' email='kellen100@comcast.net' />
        </div>
    )
}
export default TestPage;

const exampleReplyList = [
    {name: 'User1', date: '10/10/2021', reply: 'This is an example reply'},
    {name: 'User2', date: '10/10/2021', reply: 'This is an example reply'},
    {name: 'User3', date: '10/10/2021', reply: 'This is an example reply'},
    {name: 'User4', date: '10/10/2021', reply: 'This is an example reply'},
    {name: 'User5', date: '10/10/2021', reply: 'This is an example reply'},
    {name: 'User6', date: '10/10/2021', reply: 'This is an example reply'},
    {name: 'User7', date: '10/10/2021', reply: 'This is an example reply'},
]
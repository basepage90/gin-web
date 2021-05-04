import React from 'react';
import styled from 'styled-components';

const Item = styled.a`
width:100%;
height:100%;
display: flex;
flex-direction: column;
justify-content: space-between;
text-decoration: none;
background-color: #fff;
border-radius: 12px;
box-shadow: ${({theme}) => theme.shadow[1]};
position: relative;
transition: ${({theme}) => theme.transition.duration.long};

&:hover {
    transition: ${({theme}) => theme.transition.duration.long};
    transform : translate(0px, -2%); 
    box-shadow: ${({theme}) => theme.shadow[5]};
}
`;

const thumbHeight= "60%";

const Thumb = styled.div`
border-radius: 12px 12px 0 0;
height: ${thumbHeight};
background-image: url('data:image/jpeg;base64,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');
background-size: cover;
background-position: center;
`;

const Thumb2 = styled.div`
border-radius: 12px 12px 0 0;
height: ${thumbHeight};
background-image: url('https://i.ytimg.com/vi/GuUqm_2-lGQ/maxresdefault.jpg');
background-size: cover;
background-position: center;
`;

const Article = styled.div`
border-radius: 0 0 12px 12px;
height: calc(100% - ${thumbHeight});
display: flex;
flex-direction: column;
padding: 12px 24px 12px 24px;

& p{
    flex: 1;
}
& span{
    font-size: 0.8rem;
}
`;

export function Card2(){
  return (
    <Item href="#">
        <Thumb2/>
        <Article>
            <h4>이유비는 훌륭하다</h4>
            <p> 개는 무슨 ㅋㅋ 이유비 볼려고 이거봄 ㅇㅈ?</p>
            <span>2020년 05월 04일</span>
        </Article>
    </Item>
  );
};

export default function Card(){
  return (
    <Item href="#">
        <Thumb/>
        <Article>
            <h4>Kendrick Lamar</h4>
            <p> Living Lengend kendrick</p>
            <span>2020년 05월 03일</span>
        </Article>
    </Item>
  );
};

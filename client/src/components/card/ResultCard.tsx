import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ImageNotFound } from 'statics/images';
import {RootState} from "store/store";

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const Item = styled.div`
    width:100%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-decoration: none;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: ${({theme}) => theme.shadow[1]};
    position: relative;
    
    transition-property: visibility, transform;
    transition-duration: ${({theme}) => theme.transition.duration.shortest}, ${({theme}) => theme.transition.duration.long};
    
    &:hover {
        transform : translate(0px, -2%); 
        box-shadow: ${({theme}) => theme.shadow[5]};
        
        transition-property: visibility, transform;
        transition-duration: ${({theme}) => theme.transition.duration.shortest}, ${({theme}) => theme.transition.duration.long};

    }
`;

const thumbHeight= "36%";

const Thumb = styled.div`
    border-radius: 12px 0 0 12px;
    width: ${thumbHeight};
    background-image: url('${ImageNotFound}');  
    background-size: cover;
    background-position: center;
`;

const Article = styled.div`
    border-radius: 0 0 12px 12px;
    width: calc(100% - ${thumbHeight});
    display: flex;
    flex-direction: column;
    padding: 16px 16px 8px 16px;

    & p{
        flex: 1;
    }

    & span{
        font-size: 0.8rem;
    }

    & .title {
        flex:1 1 auto;
        color: #212429;
        font-size: 1.1rem;
        font-weight: bold;
        margin: 0;
        
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & .hashtag {
        flex:1 1 auto;
        margin-bottom: 8px;
        color: #444A55;
        font-size: 0.9rem;
        font-weight: bold;
        
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & .resultText {
        flex:2 2 auto;
        margin: 0;
        color: #444A55;
        font-size: 0.875rem;
        
        word-break: break-word;
        overflow-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    & .categoryInfo {
        color: #808999;
        display: flex;
        align-items: center;
    }
    
    & .privacyWrapper {
        flex: 1 1 0;
    }

    & .privacy {
        color: ${({theme}) => theme.palette.red3};
        font-weight: bold;
        float: right;
    }
`;

const Highlight = styled.span<{type: string}>`
    font-weight: bold;
    color: ${({theme}) => theme.palette.sky1 };
    font-size: ${props => props.type === 'title' ? '1.1rem' : '0.875rem'} !important;
`;

interface ResultCardProps {
    data: any;
}

export default function ResultCard({data}: ResultCardProps){
    const {id,title,desc,contents,hashtag,thumbnail,privacy,category_lg,category_md} = data;
    const arrowIcon = <ArrowRightIcon key="arrow" />;

    const { searchword } = useSelector((state: RootState) => ({searchword: state.search.searchword }) );

    const cutResultText = () => {
        const ResultList = [desc, contents, hashtag];
        let res = desc;
        let startIndex: number = 0;

        ResultList.some((result) =>  {
            startIndex = result.toLowerCase().indexOf(searchword.toLowerCase(), 0);
            if(startIndex >= 0){
                res = result;
            }
            return startIndex >= 0;
        });

        const resultText = res.substring(startIndex-20, startIndex+100);

        return resultText;
    }

    const doTextHighlight = (text: string,type: string) => {
        if (searchword !== '' && text.toLowerCase().includes(searchword.toLowerCase())) {
          const parts = text.split(new RegExp(`(${searchword})`, 'gi'));
          return (
            <>
              {parts.map((part, index) =>
                part.toLowerCase() === searchword.toLowerCase() ? (
                  <Highlight key={index} type={type}>{part}</Highlight>
                ) : (
                  part
                ),
              )}
            </>
          );
        }
        return text;
    }

    return (
        <Link to={{pathname: `/${category_lg}/${category_md}/${id}`}} style={{textDecoration: 'none'}}>
            <Item>
                {thumbnail === "" ? <Thumb /> : <Thumb style={{backgroundImage: 'url("'+thumbnail+'")'}} />}
                <Article>
                    <h4 className="title">{doTextHighlight(title,"title")}</h4>
                    <p className="resultText">{doTextHighlight(cutResultText(),"")}</p>
                    <span className="categoryInfo">
                        {category_lg}{arrowIcon}{category_md}
                        <div className="privacyWrapper">
                            {privacy === 'private' && <span className="privacy">비공개</span>}
                        </div>
                    </span>
                </Article>
            </Item>
        </Link>
    );
};

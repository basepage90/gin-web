import Article from 'components/common/article/article'
import PrivacySwitch from 'components/common/article/PrivacySwitch'
import EditAndDelete from 'components/common/article/EditAndDelete'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'
import { GetArticles } from 'gql/query'
import NotFoundPage from 'pages/NotFoundPage';

function ArtilceViewer (){
    const { id } = useParams();
    
    const { loading, data } = useQuery(GetArticles, {
        variables: { id },
        fetchPolicy: "cache-and-network",
    });

    const userInfo = useSelector(state => state.user);

    if(loading){
        return null
    } else if (data === undefined){
        return <NotFoundPage />
    } else {
        return(
            <>
                {userInfo.admin_flag ? 
                <>
                    <PrivacySwitch data={data.articles} />
                    <EditAndDelete data={data.articles}/>
                </>
                : null}
                <Article data={data.articles} /> 
            </>
        )
    }
}

export default ArtilceViewer;
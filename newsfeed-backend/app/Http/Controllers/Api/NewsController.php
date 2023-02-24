<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Models\Category;
use App\Models\Source;
use Illuminate\Http\Request;
use Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class NewsController extends Controller
{
    // NEWS API GET REQUEST
    function getRequest($params = array(), $endpoint){
        $apiURL = config('news.NEWS_API_URL');
        $apiKey = config('news.NEWS_API_KEY');
        $params["apiKey"] = $apiKey;
        $getParams = http_build_query($params,'','&');
        return Http::get("{$apiURL}/{$endpoint}?{$getParams}");
    }


    // TOP HEADLINES (DEFAULT)
    function default(){

        $params = array( 'language' => 'en');
        $newsRequest = $this->getRequest($params, 'top-headlines')['articles'];

        $news = array();
        $authors = array();
        foreach($newsRequest as $key => $newsArticle){
            $news[$key]['title']        = $newsArticle['title'];
            $news[$key]['source_id']    = $newsArticle['source']['id'];
            $news[$key]['source_name']  = $newsArticle['source']['name'];
            $news[$key]['author']       = $newsArticle['author'];
            $news[$key]['date']         = date('d/m/Y', strtotime($newsArticle['publishedAt']));
            $news[$key]['url']          = $newsArticle['url'];
            $news[$key]['image']        = $newsArticle['urlToImage'];
            $news[$key]['text']         = $newsArticle['description'];

            // Article category
            $category = Source::where('name', $newsArticle['source']['name'])->first();
            $category = is_null($category) ? '':ucfirst($category->category['name']);
            $news[$key]['category'] = $category;

            // Add authors
            if(!in_array($newsArticle['author'],$authors) && !empty($newsArticle['author']))
                $authors[] = strip_tags($newsArticle['author']);
        };

        return response()->json([
            'articles' => array_values($news),
            'categories' => [],
            'sources' => [],
            'authors' => $authors
        ]);
    }



    // NEWSFEED (AUTH)
    function newsfeed(){
        $user = Auth::user();

        // User selected sources
        $sources = $user->sources()->get()->toArray();
        $sourcesNames = array_map(fn ($source) => ucfirst($source['name']), $sources);
        $sources = array_map(fn ($source) => $source['source_id'], $sources);

        // User selected categories
        $categories = $user->categories()->get()->toArray();
        $categoriesNames = array_map(fn ($category) => ucfirst($category['name']), $categories);
        $categories = array_map(fn ($category) => $category['id'], $categories);

        $params = array(
            'language' => 'en',
            'sources' => implode(",", $sources)
        );
        $newsRequest = $this->getRequest($params, 'top-headlines')['articles'];

        $news = array();
        $authors = array();
        foreach($newsRequest as $key => $newsArticle){

            $category = Source::where('name', $newsArticle['source']['name'])->first();
            $category = is_null($category) ? ['id' => -1]:$category->category;

            if(count($categories) && !in_array($category['id'], $categories)){
                continue;
            }

            $news[$key]['title']        = $newsArticle['title'];
            $news[$key]['source_id']    = $newsArticle['source']['id'];
            $news[$key]['source_name']  = $newsArticle['source']['name'];
            $news[$key]['author']       = strip_tags($newsArticle['author']);
            $news[$key]['date']         = date('d/m/Y', strtotime($newsArticle['publishedAt']));
            $news[$key]['url']          = $newsArticle['url'];
            $news[$key]['image']        = $newsArticle['urlToImage'];
            $news[$key]['text']         = strip_tags($newsArticle['description']);
            $news[$key]['category']     = isset($category['name']) ? ucfirst($category['name']):'';

            if(!in_array($newsArticle['author'],$authors) && !empty($newsArticle['author']))
                $authors[] = strip_tags($newsArticle['author']);
        };

        return response()->json([
            'articles' => array_values($news),
            'categories' => $categoriesNames,
            'sources' => $sourcesNames,
            'authors' => $authors
        ]);
    }


    // SEARCH NEWS BY KEYWORD
    function search(SearchRequest $request){

        $data = $request->validated();
        $searchQuery = $data['query'];
        $dateFrom = isset($data['from']) ? $data['from']:'';
        $dateTo = isset($data['to']) ? $data['to']:'';

        $params = array(
            'q' => $searchQuery,
            'from' => $dateFrom,
            'to' => $dateTo
        );
        $newsRequest = $this->getRequest($params, 'everything')['articles'];

        $news = array();
        foreach($newsRequest as $key => $newsArticle){
            $news[$key]['title']        = $newsArticle['title'];
            $news[$key]['source_id']    = $newsArticle['source']['id'];
            $news[$key]['source_name']  = $newsArticle['source']['name'];
            $news[$key]['author']       = $newsArticle['author'];
            $news[$key]['date']         = date('d/m/Y', strtotime($newsArticle['publishedAt']));
            $news[$key]['url']          = $newsArticle['url'];
            $news[$key]['image']        = $newsArticle['urlToImage'];
            $news[$key]['text']         = $newsArticle['description'];

            $category = Source::where('name', $newsArticle['source']['name'])->first();

            // $category = is_null($category) ? '':ucfirst($category->category['name']);
            $news[$key]['category'] = is_null($category) ? '':ucfirst($category->category['name']);
            $news[$key]['category_id'] = is_null($category) ? '':ucfirst($category->category['id']);
        };

        return response()->json([
            'articles' => array_values($news),
            'categories' => [],
            'sources' => [],
            'authors' => []
        ]);
    }
}

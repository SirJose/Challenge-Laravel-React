<?php

namespace Database\Seeders;

use App\Models\Source;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Config;
use Illuminate\Support\Facades\Http;

class SourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Fetch sources via GET request

        $apiURL = config('news.NEWS_API_URL');
        $apiKey = config('news.NEWS_API_KEY');

        $params = array( 'apiKey' => $apiKey);
        $getParams = http_build_query($params,'','&');

        $sources = Http::get("{$apiURL}/top-headlines/sources?{$getParams}");

        if( isset($sources['status']) && $sources['status'] === 'ok' ){
            foreach($sources['sources'] as $newsource){
                $category = Category::where("name",$newsource['category'])->first('id')['id'];

                $source = new Source;
                $source->source_id      = $newsource['id'];
                $source->name           = $newsource['name'];
                $source->category_id    = $category;
                $source->save();
            }
        }
    }
}

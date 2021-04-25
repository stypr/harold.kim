const fs = require('fs')
const glob = require('glob')
const path = require('path')
const matter = require('gray-matter')

exports.getPosts = () => {
    result = []
    postDir = path.resolve(__dirname, '../blog/**/*.md')
    posts = glob.sync(postDir);

    for(i in posts){
        post = fs.readFileSync(posts[i]);
        post_metadata = matter(post, {excerpt: true});

        if(post_metadata.data.secret === false){
            _parsed = {}
            _parsed.title = post_metadata.data.title
            _parsed.created_at = new Date(post_metadata.data.date).toISOString().substr(0, 10);
            _parsed.tag = post_metadata.data.tag.trim().split(",")
            _parsed.category = post_metadata.data.category
            _parsed.filename = posts[i].substring(posts[i].indexOf("/blog"), posts[i].lastIndexOf("/")).concat("/")
            result.push(_parsed)
        }
    }
    return result
}

exports.getGists = () => {
  // Todo..
  result = {}
  gists = fs.readFileSync('src/public/gists.json');
  result = JSON.parse(gists);
  return result
}
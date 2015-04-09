DCrawler
=============

DCrawler is Nodejs Crawler, multi-module-spider, jQuery query page content, multi thread support.


Contact 
=============

Van-Duyet Le (lvduit08 at gmail.com)

Home: http://lvduit.com

Features
--------

Current features:

* Content parser like jQuery.
* Multi-modules spider parse.
* MongoDb Store


Usage
-----

Make sure your Nodejs and MongoDb are installed.

**To install:**

Clone the script from Github

    git clone https://github.com/lvduit/DCrawler.git
    cd ./DCrawler

Install Node modules

    npm install

Config your spider, the sample spider is located at `modules/tinhte.js`

**To run:**

    node index

For multi thread base on your CPU Core 

    node multithread


**To view your data:**

Using https://github.com/lvduit/mongo-express for GUI MongoDb Data view.


License
-------
MIT License

Copyright (c) 2015 Van-Duyet Le

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

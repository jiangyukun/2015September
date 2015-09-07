@extends('layouts.master')
@section('title')
    竞价列表 - @parent
@stop

@section('script')
    <script>
        $(function () {

            //为filter下的所有a标签添加单击事件
            $("#brand-nav a").click(function () {
                $("#brand-nav a[class='seled']").each(function () {
                    $(this).removeClass("seled");
                });
                $(this).attr("class", "seled");

                var pn = $("#hcateid").val();//#gotopagenum是文本框的id属性
                var url = "/demand/list/cate/" + pn + "/";  //分类id一定是存在的
                var bid = $(this).attr("bid");
                url = url + '?bid=' + bid;
                location.href = url;//location.href实现客户端页面的跳转


            });
        });

        function RetSelecteds() {
            var result = "";
            $("#site-nav a[class='seled']").each(function () {
                $(this).removeClass("seled");
            });
            return result;
        }


    </script>
    <style>
        body {
            font-size: 12px;
        }

        h4 {
            font-weight: normal;
            font-size: 12px;
        }
    </style>
@endsection

@section('content')
    <div class="page-demand-list">
        <div class="container">

            <form method="get" id="searchform" action="/demand/list" class="form_search">

                <style>
                    .top-search .submit {
                        width: 82px;
                        height: 35px;
                        position: absolute;
                        border: 0;
                        right: -2px;
                        top: -2px;
                        cursor: pointer;
                        font-size: 16px;
                        color: #fff;
                        background: #D50B0B;
                        line-height: 32px;
                    }

                    .top-search .form-fields {
                        position: relative;
                        width: 544px;
                        height: 31px;
                        border: 2px #D50B0B solid;
                        overflow: hidden;
                    }

                    .top-search .search-cat {
                        display: block;
                        background: url(../images/header_sprites.png) 0 -97px;
                        width: 70px;
                        padding-left: 77px;
                        line-height: 36px;
                        height: 36px;
                        color: #333;
                    }

                    .top-search .search-cat a:hover {
                        color: #990000;
                    }

                    .top-search-box .keyword {
                        height: 22px;
                        width: 453px;
                        border: 0px;
                        line-height: 22px;
                        position: absolute;
                        left: 6px;
                        top: 3px;
                        color: #666;
                    }

                    .top-search-box input {
                        vertical-align: middle;
                        line-height: 150%;
                    }

                    .text_search {
                        border: none;
                    }
                </style>

                <div class="top-search">
                    <div class="form-fields">
                        <form method="GET" action="index.php?app=search">
                            <input type="hidden" name="app" value="search">
                            <input type="hidden" name="act" value="index">
                            <input type="text" name="keyword"
                                   value="{{ $_GET['s'] or '' }}" name="s" id="s"
                                   class="index_bj kw_bj keyword" style="border: none;width: 400px;height: 32px;">
                            <input type="submit" value="搜索" class="submit" hidefocus="true">
                        </form>
                    </div>
            </form>

        </div>


        <link rel="stylesheet" href="{{ url('/css/cate.css') }}">

        <input type="hidden" id="hcateid" value="{{$hcateid}}"/>

        <div class="col-xs-12" style="margin-top: 20px;">
            <div class="col-xs-1" style="text-align: right ;line-height: 27px;padding: 0px;">品类：</div>
            <div class="col-xs-11">
                <div id=page>
                    <div class="chl-poster simple" id=header>
                        <div id=site-nav>
                            <UL class=quick-menu>
                                @foreach ($cates as $key=>$cate)
                                    <LI class="services menu-item  ">
                                        <div class=menu>
                                            <A class=menu-hd href="/demand/list/cate/{{ $cate["id"] }}" target=_top>
                                                {{ $cate["slug"] }}<!----<B></B>----></A>

                                            <div class=menu-bd style="WIDTH: 560px; /*HEIGHT: 262px; _width: 202px*/"
                                                 id="menu_{{$key}}">
                                                <div class=menu-bd-panel>

                                                    <? if ($cate['children']) {
                                                        $oc = $cate['children'];
                                                        foreach ($oc as $one) {
                                                            echo "<DL><DT><A href='/demand/list/cate/" . $one['id'] . "'> " . $one['slug'] . "</A> <i>&gt;</i>";

                                                            if ($one['children']) {
                                                                $twoc = $one['children'];
                                                                echo "<DD>";
                                                                $i = 0;
                                                                foreach ($twoc as $two) {
                                                                    if ($i < 13)
                                                                        echo " <A href='/demand/list/cate/" . $two['id'] . "'>" . $two['slug'] . "</A>";
                                                                    $i++;
                                                                }
                                                                echo "</DD>";
                                                            }

                                                            echo "</DL>";
                                                        }
                                                    }?>


                                                </div>
                                                <S class=r></S><S class=rt></S><S class=lt></S><S class=b
                                                                                                  style="WIDTH: 169px"></S>
                                                <S class="b b2" style="WIDTH: 169px"></S><S class=rb></S><S
                                                        class=lb></S>
                                            </div>
                                        </div>
                                    </LI>
                                @endforeach

                            </UL>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        @if($hcateid!=0)
            <div class="col-xs-12" style="margin-top: 10px;">
                <div class="col-xs-1" style="text-align: right ;line-height: 27px;padding: 0px;">品牌：</div>
                <div class="col-xs-11">
                    <div class="chl-poster simple" id=header>
                        <div id=brand-nav>
                            <UL class=quick-menu>
                                @foreach ($brands as $brand)
                                    <li class="home"><a href="javascript:void(0);"
                                                        bid="{{$brand->id}}">{{$brand->bname}}</a></li>
                                @endforeach
                            </UL>
                        </div>
                    </div>
                </div>
            </div>
        @endif


        <div class="col-xs-12">


            <div class="col-xs-9">
                @if (count($demands))
                    @foreach ($demands as $demand)
                        <div class="row">
                            <div class="d-list-sn"><span>订单编号：{{ $demand->sn }}</span>
                                <span>提交时间：{{ $demand->created_at }}</span>
                                <span class="d-author"><a href="#">{{ $demand->user->username }}</a></span></div>
                            <div class="col-xs-2"><img src="/{{ $demand->thumb }}"></div>
                            <div class="col-xs-7 d-list-title">
                                <h4><a href="{{ URL::to('demand/show/'.$demand->id) }}"
                                       title="{{ $demand->title }}">{{ $demand->title }}</a></h4>
                                <a href="{{ $demand->url }}" title="{{ $demand->title }}" target="_blank"
                                   rel="nofollow">点击进入竞价对照商品页面</a></div>
                            <div class="col-xs-3 d-list-info">
                                <p>初始竞价：￥{{ $demand->price }}</p>

                                <p>竞价商家：{{ count($demand->bids)?count($demand->bids):'暂无' }}</p>

                                <p>距离结束：{{ $demand->getexptime() }}</p>
                                <a href="{{ URL::to('demand/show/'.$demand->id) }}" class="btn btn-danger">竞价详情
                                    <i class="fa fa-angle-right"></i></a>
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="row" style="border: none;">

                        <div style="width: 400px;height: 120px;margin: 0 auto;padding-top: 150px;padding-bottom: 300px; ">
                            <img src="/images/emptycart.jpg"
                                 style="width: 115px;height: 88px;margin-right: 20px;float:left;">

                            <p style="width: 200px;height: 120px;float: left;padding-top: 40px;font-size: 14px;">
                                没有正在竞价的商品哦,马上发布成为第一个吧<br/>
                                <a href="/demand/post/">点此发布&gt;</a>
                            </p>

                        </div>
                    </div>
                @endif
            </div>


            <div class="col-xs-12"> <?php echo $demands->render(); ?>  </div>
            <div class="col-xs-3"></div>
        </div>
    </div>

    </div>
@stop



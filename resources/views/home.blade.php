@extends('layouts.app')

@section('content')
<div class="container-msger">

  <section class="msger">
      <header class="msger-header">
        <div class="msger-header-title">
          <i class="fas fa-comment-alt"></i> Количесвто пользователей:  <span style="font-weight: bold;">{{$users_count}}</span>
        </div>
        <div class="msger-header-options">
          <span><i class="fas fa-cog"></i></span>
        </div>
      </header>
    
      <main class="msger-chat">

      </main>
      <div class="msger-inputarea user-list">
        <ul>
          @foreach($allusers as $usr)
            <li class="userID"><img src="../img/person.png" style="width: 40px;">{{$usr->name}}</li>
          @endforeach
        </ul>
      </div>
      <form class="msger-inputarea" action="/" method="post">
         {{csrf_field()}}
        <input type="text" class="msger-input" name="sendmessage" id="sendmessage" placeholder="@ Кому написать...">   
        <input type="submit" class="msger-send-btn" id="btn-sendmessage" value="Send">
      </form>
    </section>  
</div> 
@endsection
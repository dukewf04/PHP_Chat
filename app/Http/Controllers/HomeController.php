<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->ajax()){            
            $data = json_decode($request->data); 
            $data->name = Auth::user()->name;
            // Если отправляем сообщение то записываем в базу
            if ($data->flag == 'SendMessage'){
                
                // Записываем в базу
                if (json_decode($request->data)->name == 'Всех'){
                    DB::table('users')
                    ->whereNotIn('name', [$data->name])
                    ->update(['last_message'=>json_encode($data)]);
                }else{
                    DB::table('users')
                    ->where('name', json_decode($request->data)->name)
                    ->update(['last_message'=>json_encode($data)]);
                }

                return 'SendMessage_Success';
            }else{ // Вывод сообщений
                // Получаем запись из поля last_message
                $login_user = Auth::user()->name;
                $msg = DB::table('users')
                ->where('name', $login_user)
                ->value('last_message');

                // Если поле не пустое то выводим сообщение, после чего очистим запись
                if ($msg != ''){                 
                    DB::table('users')
                    ->where('name', $login_user)
                    ->update(['last_message'=>'']);                  

                    return $msg;
                }else return ''; 
            };
            
        }else{ // Когда просто обновляем страницу
            // $send_text = $request->input($key = 'sendmessage');
            // $select_user = $request->input($key = 'username');
            $allusers = DB::table('users')->get();
            $users_count = DB::table('users')->count();
            $login_user = Auth::user()->name;
            DB::table('users')
                ->where('name', $login_user)
                ->update(['last_message'=>'']);
            return view('home', ['allusers' => $allusers, 'users_count'=>$users_count]); 
        }; 
    }
}

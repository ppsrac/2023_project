package com.ssafy.stellargram.module

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

@Module
@InstallIn(SingletonComponent::class)
object FavoriteModule {
    val favorites : MutableState<HashSet<Int>> = mutableStateOf(HashSet())

    fun initFavorite(favoriteList: List<Favorite>){
        for(favorite in favoriteList){
            favorites.value.add(favorite.star_Id)
        }
    }
}
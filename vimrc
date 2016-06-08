let iCanHazVundle=1
let vundle_readme=expand('~/.vim/bundle/vundle/README.md')
if !filereadable(vundle_readme) 
    echo "Installing Vundle.."
    echo ""
    silent !mkdir -p ~/.vim/bundle
    silent !git clone https://github.com/VundleVim/Vundle.vim ~/.vim/bundle/vundle
    let iCanHazVundle=0
endif
set nocompatible              " be iMproved, required
filetype off                  " required
set rtp+=~/.vim/bundle/vundle/
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
"Add your bundles here
Plugin 'Syntastic' "uber awesome syntax and errors highlighter
Plugin 'wincent/command-t'
Plugin 'scrooloose/nerdtree'
Plugin 'altercation/vim-colors-solarized' "T-H-E colorscheme
Plugin 'https://github.com/tpope/vim-fugitive' "So awesome, it should be illegal 
Plugin 'airblade/vim-gitgutter' 
Plugin 'fatih/vim-go'
"...All your other bundles...
if iCanHazVundle == 0
    echo "Installing Vundles, please ignore key map error messages"
    echo ""
    :PluginInstall
endif

call vundle#end() 
"must be last
filetype plugin indent on " load filetype plugins/indent settings

let g:solarized_termcolors=256
set t_Co=256
syntax enable
set background=dark
colorscheme solarized

set rnu
set number
set nobackup
set clipboard=unnamed
set tabstop=4
set shiftwidth=4
set expandtab
set autoread

" " swap files (.swp) in a common location
" " // means use the file's full path
set dir=~/.vim/_swap//

" " backup files (~) in a common location if possible
set backup
set backupdir=~/.vim/_backup/,~/tmp,.

" " turn on undo files, put them in a common location
set undofile
set undodir=~/.vim/_undo/


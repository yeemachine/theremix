<script>
import Toggle from './UIElements/UI.toggle.svelte'
import ButtonCircle from './UIElements/UI.buttoncircle.svelte'
import gestureIcon from '../icons/gesture.svelte'
import pauseIcon from '../icons/pause.svelte'
import settingsIcon from '../icons/settings.svelte'
import closeIcon from '../icons/close.svelte'
import Settings from './UI.settingsexpanded.svelte'

import {expandSettings,active,camera} from '../../stores.js'
</script>

<nav class="{$active ? '':'hide'}">
    <ButtonCircle 
    icon={pauseIcon}
    settingState={false}  
    setting={active} 
    hide={
        (!$active) ? true
         :false}
    styles={'margin-right:16px'}/>
    <div class="gestures">
        <Toggle 
        icon={gestureIcon} 
        setting={camera} 
        hide={
            (!$active) ? true
            :false}/>
        <p class="label">{!$camera ? 'Enable Gestures' : 'Disable Gestures'}</p>
    </div>
    <div class="settings">
        <ButtonCircle 
        icon={
            $expandSettings ? closeIcon
            : settingsIcon
        } 
        selected= {
            $expandSettings ? true
            : false
        }
        setting={expandSettings} 
        settingState={null}  
        hide={$active ? false : true}
        />
    </div>
    <Settings/>
</nav>



<style>
    nav.hide{
        opacity:0;
        pointer-events: none;
    }
    nav{
        display: flex;
        position:absolute;
        height:calc(100% - 48px);
        padding:24px;
        width:calc(100% - 48px);
        top:0;
        left:0;
        pointer-events: none;
        opacity: 1;
        transition:opacity .25s;
    }
    .gestures{
            display: flex;
    position: relative;
    width: max-content;
    height: max-content;
    align-items: center;
    flex-direction: column;
    }
    .settings{
        position:absolute;
        top:24px;
        right:24px;
        z-index:2;
    }

    .label{
            position: absolute;
        top: 56px;
        /* left: 24px; */
        left: unset;
        width: max-content;
        line-break: normal;
        font-size: 12px;
        background: rgb(var(--crimson));
        padding: 6px 12px 6px 12px;
        border-radius: 16px;
        color: rgb(var(--offwhite));
        opacity: 0;
        text-align: center;
        text-shadow: 0 0 20px rgba(0,0,0,0.5);
        transition: 0s;
        display: flex;
        justify-content: center;
        pointer-events: none;
    }
    .label:before{
        content: '';
        position: absolute;
        top: -6px;
        margin: auto;
        pointer-events: none;
        border-style: solid;
        border-width: 0px 4px 6px 4px;
        border-color:  transparent transparent rgb(var(--crimson)) transparent;
    }
    
    @media only screen and (max-width: 600px) {
        nav{
            padding: 16px 16px 0 16px;
            width: calc(100% - 32px);
            height: calc(100% - 16px);
        }
        .settings{
            top:16px;
            right:16px;
        }

    }

    @media (hover: hover) {
        .gestures:hover .label{
        opacity:1;
        }
	}

</style>
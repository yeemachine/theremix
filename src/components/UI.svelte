<script>
import Toggle from './UI.toggle.svelte'
import ButtonCircle from './UI.buttoncircle.svelte'
import gestureIcon from './icons/gesture.svelte'
import pauseIcon from './icons/pause.svelte'
import settingsIcon from './icons/settings.svelte'
import closeIcon from './icons/close.svelte'
import Settings from './UI.settingsexpanded.svelte'

import {expandSettings,active,camera} from './stores.js'
</script>


<nav>
    <ButtonCircle 
    icon={pauseIcon}
    settingState={false}  
    setting={active} 
    hide={
        (!$active) ? true
         :false}
    styles={'margin-right:16px'}/>
    <Toggle 
    icon={gestureIcon} 
    setting={camera} 
    hide={
        (!$active) ? true
         :false}/>
    <div>
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
    nav{
        display: flex;
        position:absolute;
        height:calc(100% - 48px);
        padding:24px;
        width:calc(100% - 48px);
        top:0;
        left:0;
        pointer-events: none;
    }
    div{
        position:absolute;
        top:24px;
        right:24px;
        z-index:2;
    }
    @media only screen and (max-width: 600px) {
        nav{
            padding: 16px 16px 0 16px;
            width: calc(100% - 32px);
            height: calc(100% - 16px);
        }
        div{
            top:16px;
            right:16px;
        }

    }

</style>
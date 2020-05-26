<script>
import Toggle from './UI.toggle.svelte'
import ButtonCircle from './UI.buttoncircle.svelte'
import gestureIcon from './icons/gesture.svelte'
import pauseIcon from './icons/pause.svelte'
import settingsIcon from './icons/settings.svelte'
import closeIcon from './icons/close.svelte'
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
</nav>


<style>
    nav{
        display: flex;
        position:absolute;
        width:calc(100% - 48px);
        top:24px;
        left:24px;
        pointer-events: none;
    }
    div{
        position:absolute;
        top:0;
        right:0;
    }
    @media only screen and (max-width: 600px) {
        nav{
            top:16px;
            left:16px;
            width:calc(100% - 32px);
        }
        div{
            top:0;
            right:0;
        }

    }

</style>

class xLine {
    constructor() {

    }
}




<div id="timeline">

<event>
  <descr>
  </descr>
  <puce></puce>
</event>

<event>
  <descr>
    Premier event regerg ergreg er reg reg erg  rg reg reg re g
  </descr>
  <puce></puce>
</event>

<event>
  <descr>
    2eme event geejezfzef zefz gzg
  </descr>
  <puce></puce>
</event>

<event>
  <descr>
  </descr>
  <puce></puce>
</event>

</div>


#timeline {
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
  border-bottom: 5px solid orange;
}

#timeline event {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

#timeline event + event {
  margin-left: 10px;
}

#timeline descr {
 text-align: center;
}

#timeline puce {
  margin: 12.5px auto -12.5px auto; /* - (width + timeline border width) / 2 */
  width: 20px;
  height: 20px;
  background: orange;
  border-radius: 50%;
}

#timeline event:first-child, #timeline event:last-child {
  flex: 0;
}